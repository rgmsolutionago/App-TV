import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
import { IDisplay } from 'src/app/model/IContent';
import { FirebaseService } from 'src/app/services/firestore.service';
import { SpeechService } from 'src/app/services/speech-synthesis-utterance';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
})
export class DesktopComponent implements OnInit {
  @Input() DISPLAY: number = 0;
  resourceIntervalConf: any;
  resourceIntervalContent: any;
  resourceIntervalCallers: any;
  resourceIntervalExhange: any;
  resourceIntervalWheater: any;
  resourceIntervalForescast: any;
  resourceIntervalNews: any;
  resourceIntervalSport: any;
  resourceIntervalCollect: any;
  resourceIntervalTrivia: any;
  resourceIntervalDidYouNow: any;
  resourceIntervalILikeToDay: any;
  resourceIntervalDetector: any;

  unit: string = 'vh';

  constructor(
    public modalCtrl: ModalController,
    public securityService: SecurityService,
    public router: Router,
    public dashboardService: DashboardService,
    private triviaService: TriviaService,
    private likeToDayService: LikeToDayService,
    private didYouNowService: DidYouNowService,
    private firebaseService: FirebaseService,
    private speechService: SpeechService,
    private showService: ShowService,
    private reviewService: ReviewService,

    public slideStaticManagerService: SlideStaticManagerService,
    private movieService: MovieService,
    private instagramService: InstagramService,
    public appConfigService: AppConfigService
  ) {}

  fetchResource() {
    this.fetchContents();
    //FETCH CALLERS
    this.fetchCallers();
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
    this.fetchInstagram();
    this.fetchDetector();
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

  fetchCallers() {
    //if (!this.dashboardService.fetchedConfigs)
    this.dashboardService.fetchCallers(() => {});
    this.resourceIntervalCallers = setInterval(
      () => this.dashboardService.fetchCallers(() => {}),
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
      clearTimeout(this.resourceIntervalCollect);
    this.resourceIntervalCollect = setTimeout(
      () => this.updateDeviceInfo(),
      INTERVAL_TO_CALL_MACHINE_APIS
    );
  }

  ngOnInit() {
    //FETCH CONFIGS
    this.fetchResource();
    /*
    this.firebaseService.fetchEmissionNumber(
      this.appConfigService.configsData?.uuid,
      (data: any) => {
        const prev = localStorage.getItem("numberCaller")
        
        if (data?.numberCaller != prev) {
          this.watchEvent(null, data?.numberCaller,true);
          localStorage.setItem("numberCaller",data?.numberCaller)
        }
      }
    );
    */
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
    this.watchEvent(event);
    this.watchDevice(event);
  }

  watchDevice(event: KeyboardEvent | null) {
    if (event) {
      const deviceId = Device.getId() ?? '0';
      this.dashboardService.callersData.forEach((caller: ICallers) => {
        if (caller.id === deviceId) {
          const number = parseInt(event.key);
          let selectedCaller = caller;
          this.watchEvent(null, number, true, selectedCaller);
        }
      });
    }
  }

  watchEvent(
    event: KeyboardEvent | null,
    number = -1,
    fromFirebase = false,
    caller: ICallers | null = null
  ) {
    if (!this.appConfigService.blockAccount) {
      let selectedCaller: any;
      let runAudio = true;

      if (event) {
        this.dashboardService.callersData.forEach((caller: ICallers) => {
          if (caller.key_code_up == parseInt(event.key)) {
            selectedCaller = caller;

            this.dashboardService.currentCallerName = caller.name;
            setTimeout(
              () => (this.dashboardService.currentCallerName = ''),
              400
            );
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
              if (this.appConfigService.display != IDisplay.SPORT_PADDEL) {
                caller.number++;
              } else {
                if (caller.number >= 0 && caller.number < 15)
                  caller.number = 15;
                else if (caller.number >= 15 && caller.number < 30)
                  caller.number = 30;
                else if (caller.number >= 30 && caller.number < 40)
                  caller.number = 40;
                else if (caller.number >= 40) caller.number = 0;
              }
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
            setTimeout(
              () => (this.dashboardService.currentCallerName = ''),
              400
            );

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
              if (this.appConfigService.display != IDisplay.SPORT_PADDEL) {
                caller.number--;
              } else {
                if (caller.number >= 40) caller.number = 30;
                else if (caller.number >= 30) caller.number = 15;
                else if (caller.number >= 15) caller.number = 0;
                else if (caller.number == 0) caller.number = 40;
                if (caller.number === 100) caller.number = 40;
              }
            }

            this.slideStaticManagerService.stopAudio();

            this.dashboardService.recopilationNumeratorData(
              caller.name,
              false,
              -1
            );
          }
        });
      } else {
        if (selectedCaller) {
          selectedCaller = caller;
        } else {
          selectedCaller = this.dashboardService.callersData[0];
        }
        this.speechService.start(`${number}`);
        selectedCaller.number = number;
        this.dashboardService.currentCallerName = selectedCaller.name;
        setTimeout(() => (this.dashboardService.currentCallerName = ''), 400);
      }

      if (selectedCaller) {
        this.dashboardService.toSaveCaller(selectedCaller.name, {
          number: selectedCaller.number,
          linkedNumber: selectedCaller.linkedNumber,
          hasTouched: true,
        });

        selectedCaller.runAudio = runAudio;

        /*
        if (runAudio)
          this.slideStaticManagerService.runAudio(
            selectedCaller.audio,
            selectedCaller.number,
            selectedCaller.name,
            'argentina',
            fromFirebase
          );
          */

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
