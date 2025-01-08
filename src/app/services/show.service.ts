import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IShow } from '../model/IShow';
import { cleanStorage, fromStorage, toStorage, uuid } from '../util/storage';
import { AppConfigService } from './app-config.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  // frecuencyShow: number = 2;
  constructor(
    public platform: Platform,
    private appConfigService: AppConfigService,
    private http: HttpService
  ) {}

  //FETCH EXCHANGE
  pendingShows: boolean = false;
  showsData: IShow[] = [];

  registerModule() {
    this.appConfigService.availableMods.next({
      ...this.appConfigService.availableMods.value,
      shows: {
        loaded: true,
        items: this.showsData,
      },
    });
  }

  buildShows() {
    this.pendingShows = false;
    this.registerModule();
    toStorage('SHOWS', JSON.stringify(this.showsData));
  }

  getNextShowsItem() {
    let next: IShow| any;
    if (this.showsData.filter((e) => !e.maskAsView).length === 0) {
      this.showsData = this.showsData.map((e) => ({
        ...e,
        maskAsView: false,
      }));
      toStorage('REPLACE-SHOWS', JSON.stringify(true));
    }

    if (this.showsData.filter((e) => !e.maskAsView).length > 0) {
      next = this.showsData.filter((e) => !e.maskAsView)[0];
      let index = this.showsData.findIndex((e) => e.uuid === next.uuid);
      this.showsData[index].maskAsView = true;
    }
    toStorage('SHOWS', JSON.stringify(this.showsData));

    return next;
  }
  fetchShows() {
    if (this.appConfigService.configsData?.modules?.show.enable)
      this.appConfigService.iniModules.push('shows');

    this.pendingShows = true;
    cleanStorage('REPLACE-SHOWS');
    this.http.call({ method: 'GET', path: '/shows' }).subscribe(
      (response) => {
        this.showsData = response.data.map((e:any) => ({
          ...e,
          uuid: uuid(),
          maskAsView: false,
        }));
        this.buildShows();
        this.appConfigService.iniModules =
          this.appConfigService.iniModules.filter((e) => e != 'shows');
      },
      (e) => {
        if (fromStorage('SHOWS')) {
          this.showsData = JSON.parse(fromStorage('SHOWS') as string);
          this.buildShows();
        }
      }
    );
  }
}
