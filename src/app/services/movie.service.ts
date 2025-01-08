import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Movie } from '../model/movie';
import { cleanStorage, fromStorage, toStorage, uuid } from '../util/storage';
import { AppConfigService } from './app-config.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // frecuencyShow: number = 2;
  constructor(
    public platform: Platform,
    private appConfigService: AppConfigService,
    private http: HttpService
  ) {}

  //FETCH EXCHANGE
  pendingMovie: boolean = false;
  movieData: Movie[] = [];

  registerModule() {
    this.appConfigService.availableMods.next({
      ...this.appConfigService.availableMods.value,
      movie: {
        loaded: true,
        items: this.movieData,
      },
    });
  }

  buildMovie() {
    this.pendingMovie = false;
    this.registerModule();
    toStorage('Movie', JSON.stringify(this.movieData));
  }

  getNextMovieItem() {
    let next: Movie | any;
    if (this.movieData.filter((e) => !e.maskAsView).length === 0) {
      this.movieData = this.movieData.map((e) => ({
        ...e,
        maskAsView: false,
      }));
      toStorage('REPLACE-MOVIE', JSON.stringify(true));
    }

    if (this.movieData.filter((e) => !e.maskAsView).length > 0) {
      next = this.movieData.filter((e) => !e.maskAsView)[0];
      let index = this.movieData.findIndex((e) => e.uuid === next.uuid);
      this.movieData[index].maskAsView = true;
    }
    toStorage('MOVIE', JSON.stringify(this.movieData));

    return next;
  }
  fetchMovie() {
    if (this.appConfigService.configsData?.modules?.movie.enable)
      this.appConfigService.iniModules.push('Movies');
    this.pendingMovie = true;

    cleanStorage('REPLACE-MOVIE');
    this.http.call({ method: 'GET', path: '/movies' }).subscribe(
      (response) => {
        this.movieData = response.data.map((e:any) => ({
          ...e,
          uuid: uuid(),
          maskAsView: false,
        }));
        this.buildMovie();
        this.appConfigService.iniModules =
          this.appConfigService.iniModules.filter((e) => e != 'Movies');
      },
      (e) => {
        if (fromStorage('Movie')) {
          this.movieData = JSON.parse(fromStorage('Movie') as string);
          this.buildMovie();
        }
      }
    );
  }
}
