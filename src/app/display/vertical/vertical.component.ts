import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ICallers } from 'src/app/model/ICallers';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SecurityService } from 'src/app/services/security.service';
import { SlideStaticManagerService } from 'src/app/services/slide-static-manager.service';
import {
  INTERVAL_TO_CALL_CALLER_APIS,
  INTERVAL_TO_CALL_CONFIGS_APIS,
  INTERVAL_TO_CALL_DETECTOR_APIS,
  INTERVAL_TO_CALL_DIDYOUNOW_APIS,
  INTERVAL_TO_CALL_EXCHANGE_APIS,
  INTERVAL_TO_CALL_INSTAGRAM_APIS,
  INTERVAL_TO_CALL_LIKETODAY_APIS,
  INTERVAL_TO_CALL_MACHINE_APIS,
  INTERVAL_TO_CALL_MOVIE_APIS,
  INTERVAL_TO_CALL_NEWS_APIS,
  INTERVAL_TO_CALL_REVIEW_APIS,
  INTERVAL_TO_CALL_SHOW_APIS,
  INTERVAL_TO_CALL_SPORT_APIS,
  INTERVAL_TO_CALL_TRIVIA_APIS,
  INTERVAL_TO_CALL_WHEATER_APIS,
  TIME_PAUSE,
} from 'src/environments/environment';
import { Device } from '@capacitor/device';
import { IDevice } from 'src/app/model/IDevice';
import { fromStorage, toStorage } from 'src/app/util/storage';
import { Router } from '@angular/router';
import { TriviaService } from 'src/app/services/trivia.service';
import { LikeToDayService } from 'src/app/services/likeToDay.service';
import { DidYouNowService } from 'src/app/services/didYouNow.service';
import { Modal402Component } from 'src/app/components/modal402/modal402.component';
import { MovieService } from 'src/app/services/movie.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { ShowService } from 'src/app/services/show.service';
import { ReviewService } from 'src/app/services/review.service';
import { InstagramService } from 'src/app/services/instagram.service';

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss'],
})
export class VerticalComponent implements OnInit {
  @Input() DISPLAY: number = 2;
  resourceIntervalConf: any;
  resourceIntervalContent: any;
  resourceIntervalCallers: any;
  resourceIntervalExhange: any;
  resourceIntervalWheater: any;
  resourceIntervalForescast: any;
  resourceIntervalNews: any;
  resourceIntervalSport: any;
  resourceIntervalCollect: any;
  isPhone: boolean = false;
  resourceIntervalTrivia: any;
  resourceIntervalDidYouNow: any;
  resourceIntervalILikeToDay: any;
  resourceIntervalDetector: any;

  //Vertical dimension
  verticalSize = {
    top: 0,
    middle: '100vw',
    bottom: '0vw',
  };

  unit: string = 'vw';

  constructor(
    public platform: Platform,
    public modalCtrl: ModalController,
    public securityService: SecurityService,
    public router: Router,
    public dashboardService: DashboardService,
    private triviaService: TriviaService,
    private likeToDayService: LikeToDayService,
    private didYouNowService: DidYouNowService,
    private instagramService: InstagramService,
    private showService: ShowService,
    private reviewService: ReviewService,

    public slideStaticManagerService: SlideStaticManagerService,
    private movieService: MovieService,
    public appConfigService: AppConfigService
  ) {}

  ngOnInit() {
    //FETCH CONFIGS
    this.isPhone = this.platform.width() <= 720;
    this.fetchResource(this.DISPLAY);
    this.appConfigService.displayScreen.subscribe((v) => {
      if (v === 3) this.initDisplayFullScreen();
      if (v === 2) this.fetchResource(v);
    });
  }

  initDisplayWithCallers() {
    this.verticalSize = {
      top: 20,
      middle: `calc(${
        60 + (this.dashboardService.callersData.length === 0 ? 20 : 0)
      }${this.unit} - ${this.appConfigService.paddingScreen.pb}px)`,
      // bottom: this.dashboardService.callersData.length === 0 ? 0 : 20,
      bottom: `calc(${
        20 + (this.dashboardService.callersData.length === 0 ? 20 : 0)
      }${this.unit} + ${
        this.appConfigService.paddingScreen.pb -
        this.appConfigService.paddingScreen.pt
      }px)`,
    };
  }

  initDisplayNoFullScreen() {
    this.verticalSize = {
      top: 20,
      middle: `calc(${
        60 + (this.dashboardService.callersData.length === 0 ? 20 : 0)
      }${this.unit} - ${
        this.appConfigService.paddingScreen.pb +
        (this.dashboardService.callersData.length === 0
          ? this.appConfigService.paddingScreen.pt
          : 0)
      }px)`,
      // bottom: this.dashboardService.callersData.length === 0 ? 0 : 20,
      bottom:
        this.dashboardService.callersData.length !== 0
          ? `calc(${this.dashboardService.callersData.length === 0 ? 0 : 20}${
              this.unit
            } - ${
              this.appConfigService.paddingScreen.pb -
              this.appConfigService.paddingScreen.pt
            }px)`
          : `0vh`,
    };

    console.log(this.verticalSize);
  }

  initDisplayFullScreen() {
    this.verticalSize = {
      top: 0,
      middle: '100vw',
      bottom: '0vw',
    };
  }

  fetchResource(display: number) {
    this.fetchContents();
    //FETCH CALLERS
    this.fetchCallers(() => {
      this.initDisplayNoFullScreen();
    });
    this.fetchNews();
    this.fetchExhange();
    this.fetchWheater();
    this.fetchSport();
    this.collectData();
    this.fetchTrivia();
    this.fetchLikeToDay();
    this.fetchDidYouNow();
    this.fetchMovie();
    this.fetchReviews();
    this.fetchShows();
    this.fetchDetector();
    this.fetchInstagram();
  }

  fetchDetector() {
    this.appConfigService.fetchRulesDetector();
    this.resourceIntervalDetector = setInterval(
      () => this.appConfigService.fetchRulesDetector(),
      INTERVAL_TO_CALL_DETECTOR_APIS
    );
  }

  fetchInstagram() {
    this.instagramService.fetchInstagram();
    this.resourceIntervalTrivia = setInterval(
      () => this.instagramService.fetchInstagram(),
      INTERVAL_TO_CALL_INSTAGRAM_APIS
    );
  }

  fetchTrivia() {
    this.triviaService.fetchTrivia();
    this.resourceIntervalTrivia = setInterval(
      () => this.triviaService.fetchTrivia(),
      INTERVAL_TO_CALL_TRIVIA_APIS
    );
  }

  fetchMovie() {
    //if (!this.dashboardService.fetchedConfigs)
    this.movieService.fetchMovie();
    this.resourceIntervalILikeToDay = setInterval(
      () => this.movieService.fetchMovie(),
      INTERVAL_TO_CALL_MOVIE_APIS
    );
  }

  fetchShows() {
    this.showService.fetchShows(),
      (this.resourceIntervalILikeToDay = setInterval(
        () => this.showService.fetchShows(),
        INTERVAL_TO_CALL_SHOW_APIS
      ));
  }

  fetchReviews() {
    this.reviewService.fetchReview();
    this.resourceIntervalILikeToDay = setInterval(
      () => this.reviewService.fetchReview(),
      INTERVAL_TO_CALL_REVIEW_APIS
    );
  }

  fetchLikeToDay() {
    //if (!this.dashboardService.fetchedConfigs)
    this.likeToDayService.fetchTikeToDay();
    this.resourceIntervalILikeToDay = setInterval(
      () => this.likeToDayService.fetchTikeToDay(),
      INTERVAL_TO_CALL_LIKETODAY_APIS
    );
  }

  fetchDidYouNow() {
    //if (!this.dashboardService.fetchedConfigs)
    this.didYouNowService.fetchDidYouNow();
    this.resourceIntervalDidYouNow = setInterval(
      () => this.didYouNowService.fetchDidYouNow(),
      INTERVAL_TO_CALL_DIDYOUNOW_APIS
    );
  }

  fetchCallers(callback: any) {
    //if (!this.dashboardService.fetchedConfigs)
    this.dashboardService.fetchCallers(callback);
    this.resourceIntervalCallers = setInterval(
      () => this.dashboardService.fetchCallers(callback),
      INTERVAL_TO_CALL_CALLER_APIS
    );
  }

  fetchSport() {
    //if (!this.dashboardService.fetchedConfigs)
    this.dashboardService.fetchSport();
    this.resourceIntervalSport = setInterval(
      () => this.dashboardService.fetchSport(),
      INTERVAL_TO_CALL_SPORT_APIS
    );
  }

  fetchNews() {
    //if (!this.dashboardService.fetchedConfigs)
    this.dashboardService.fetchNews();
    this.resourceIntervalNews = setInterval(
      () => this.dashboardService.fetchNews(),
      INTERVAL_TO_CALL_NEWS_APIS
    );
  }

  fetchExhange() {
    //  if (!this.dashboardService.fetchedConfigs)
    this.dashboardService.fetchExchange();
    this.resourceIntervalExhange = setInterval(
      () => this.dashboardService.fetchExchange(),
      INTERVAL_TO_CALL_EXCHANGE_APIS
    );
  }

  fetchWheater() {
    // if (!this.dashboardService.fetchedConfigs)
    this.dashboardService.fetchWheater();
    this.resourceIntervalWheater = setInterval(
      () => this.dashboardService.fetchWheater(),
      INTERVAL_TO_CALL_WHEATER_APIS
    );
  }

  fetchContents() {
    if (
      !this.appConfigService.fetchedConfigs ||
      this.dashboardService.contentsData.length === 0
    )
      this.dashboardService.fetchContents();
  }

  collectData() {
    if (this.resourceIntervalCollect)
      clearInterval(this.resourceIntervalCollect);
    this.resourceIntervalCollect = setInterval(
      () => this.updateDeviceInfo(),
      INTERVAL_TO_CALL_MACHINE_APIS
    );
  }

  getMaxCallerValue() {
    let max = -999999999999;
    this.dashboardService.callersData.forEach((element) => {
      if (element.hasTouched && element.linkedNumber > max)
        max = element.linkedNumber;
    });
    return max;
  }

  format100(n: number) {
    if (n < 0) {
      let r = 0;
      if (n > -100) r = 100 + n;
      else r = this.format100(n + 100);
      return r;
    } else {
      let r = 0;
      if (n < 100) r = n;
      else r = this.format100(n - 100);
      return r;
    }
  }

  resourceKey: any;
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (!this.appConfigService.blockAccount) {
      let selectedCaller: any;
      let runAudio = true;

      this.dashboardService.callersData.forEach((caller: ICallers) => {
        if (caller.key_code_up == parseInt(event.key)) {
          selectedCaller = caller;

          this.dashboardService.currentCallerName = caller.name;
          setTimeout(() => (this.dashboardService.currentCallerName = ''), 400);
          if (this.appConfigService.configsData.callers_linked) {
            /* LINKED */
            if (!caller.hasTouched) caller.hasTouched = true;

            let storage_value: number = this.getMaxCallerValue();
            var new_value = storage_value + 1;
            toStorage(`STORAGE-CALLER-VALUE-${caller.name}`, `${new_value}`);
            caller.linkedNumber = new_value;

            caller.number = this.format100(caller.linkedNumber ?? 0);
            /* LINKED */
          } else {
            if (caller.number == 99) caller.number = -1;
            caller.number++;
          }

          this.dashboardService.recopilationNumeratorData(
            caller.name,
            true,
            caller.number
          );
        }
        if (caller.key_code_down == parseInt(event.key)) {
          selectedCaller = caller;
          this.dashboardService.currentCallerName = caller.name;
          setTimeout(() => (this.dashboardService.currentCallerName = ''), 400);

          runAudio = false;

          if (this.appConfigService.configsData.callers_linked) {
            /* LINKED */
            if (!caller.hasTouched) caller.hasTouched = true;

            let storage_value: number = fromStorage(
              `STORAGE-CALLER-VALUE-${caller.name}`
            )
              ? parseInt(
                  fromStorage(`STORAGE-CALLER-VALUE-${caller.name}`) as string
                )
              : 0;

            var new_value = storage_value - 1;
            toStorage(`STORAGE-CALLER-VALUE-${caller.name}`, `${new_value}`);
            caller.linkedNumber = new_value;
            caller.number = this.format100(caller.linkedNumber ?? 0);

            /* LINKED */
          } else {
            if (caller.number === 0) caller.number = 100;
            caller.number--;
          }

          this.slideStaticManagerService.stopAudio();

          this.dashboardService.recopilationNumeratorData(
            caller.name,
            false,
            -1
          );
        }
      });

      if (selectedCaller) {
        this.dashboardService.toSaveCaller(selectedCaller.name, {
          number: selectedCaller.number,
          linkedNumber: selectedCaller.linkedNumber,
          hasTouched: true,
        });

        selectedCaller.runAudio = runAudio;

        if (runAudio)
          this.slideStaticManagerService.runAudio(
            selectedCaller.audio,
            selectedCaller.number,
            selectedCaller.name,
            'argentina'
          );

        this.dashboardService.keyboardEventCall = true;
        this.dashboardService.keyboardEventCallAsFullScreen =
          selectedCaller.fullscreen;
        this.dashboardService.keyboardEventCallCaller = selectedCaller;

        if (this.resourceKey) clearTimeout(this.resourceKey);
        this.resourceKey = setTimeout(() => {
          this.dashboardService.keyboardEventCall = false;
        }, TIME_PAUSE);
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  resizeEvent(event: KeyboardEvent) {
    this.appConfigService.updateDevice();
    this.isPhone = this.platform.width() <= 720;
  }

  formatBytes(bytes: any, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  updateDeviceInfo() {
    Device.getInfo().then((e: any) => {
      let callers: any[] = [];
      if (this.appConfigService.displayNumber === 0)
        this.dashboardService.callersData.forEach((key) => {
          callers.push({
            name: key.name,
            primary_color: key.primary_color,
            key_code_down: key.key_code_down,
            key_code_up: key.key_code_up,
            value: key.number,
          });
        });

      let deviceInfo: IDevice = {
        ram: this.formatBytes(e.memUsed),
        screenshot: e.screenshot ? e.screenshot : '',
        storage: this.formatBytes(e.realDiskTotal - e.realDiskFree),
        version_app: '3.0',
        name: fromStorage('X-Device-Name') as string,
        status: this.appConfigService.configsData.is_active,
        callers: callers,
      };
      this.dashboardService.pushDeviceInfo(deviceInfo);
    });
  }
}
