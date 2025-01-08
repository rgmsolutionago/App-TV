import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ICallers } from 'src/app/model/ICallers';
import { Movie } from 'src/app/model/movie';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { MovieService } from 'src/app/services/movie.service';
import { getModuleVideo } from 'src/app/util/common';
import { TIME_PAUSE } from 'src/environments/environment';

@Component({
  selector: 'movie-preview',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() widthContainer!: number;
  @Input() heightContainer!: number;
  @Input() DISPLAY: number = 0;

  @ViewChild('video') video!: ElementRef;
  endVideo: boolean = false;
  movie!: Movie| any;
  constructor(
    public dashboardService: DashboardService,
    public movieService: MovieService,
    public appConfigService: AppConfigService
  ) {}

  ngOnInit() {
    this.movie = this.movieService.getNextMovieItem();
  }

  ngAfterViewInit() {
    if (this.movie) {
      this.inicializeVideo(this.getVideo());
    } else {
      this.nextSlide();
    }
  }

  nextSlide() {
    this.dashboardService.nextContent();
  }
  getVideo() {
    return getModuleVideo(
      'movie',
      this.appConfigService.displayScreen.value === 2,
      this.dashboardService.callersData.length <= 1
    );
  }
  second: number = 15;
  runCounter() {
    setInterval(() => {
      this.second = this.second - 1;
    }, 1000);
  }

  interval: any;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    let selectedCaller;
    this.dashboardService.callersData.forEach((caller: ICallers) => {
      if (caller.key_code_up == parseInt(event.key)) {
        selectedCaller = caller;
      }
      if (caller.key_code_down == parseInt(event.key)) {
        selectedCaller = caller;
      }
    });

    if (selectedCaller) {
      this.video.nativeElement.pause();
      setTimeout(() => {
        this.video.nativeElement.play();
      }, TIME_PAUSE);
    }
  }
  inicializeVideo(src = '') {
    this.video.nativeElement.src = src;
    this.video.nativeElement.load();

    this.play();
    this.video.nativeElement.addEventListener(
      'ended',
      () => {
        this.endVideo = true;
        setTimeout(() => {
          setTimeout(() => {
            this.nextSlide();
          }, 4000);
        }, this.second * 1000);
      },
      false
    );
  }

  pause() {
    this.video.nativeElement.pause();
  }
  play(reset: boolean = true) {
    if (reset) {
      this.video.nativeElement.pause();
      this.video.nativeElement.currentTime = 0;
    }
    if (!this.appConfigService.configsData?.audio)
      this.video.nativeElement.volume = 0;
    else this.video.nativeElement.volume = 1;

    this.video.nativeElement
      .play()
      .then((r: any) => {})
      .catch((e: any) => {
        this.nextSlide();
      });
  }

  getImage() {
    return `url('../../../assets/module/movie/cine_tv_pop.gif')`;
  }

  getStyleBG() {
    return `background:url('${this.movie.poster}');background-size: cover;`;
  }

  getStyle(vote: number) {
    let per = (vote * 100) / 10;
    let deg = (per * 360) / 100;
    return `background:conic-gradient(#FFF 0deg ${deg}deg,rgb(255 255 255 / 35%) ${deg}deg 360deg)`;
  }
}
