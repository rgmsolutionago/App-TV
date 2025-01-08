import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISlideLoaded, OptLoaded } from '../model/ISlideLoaded';
import { IConfig, IKey, ISlideType } from '../model/IConfig';
import { fromStorage, toStorage } from '../util/storage';
import { printInfo, updateReel } from '../util/common';
import { SecurityService } from './security.service';
import { HttpService } from './http.service';
import { IContent, IDisplay } from '../model/IContent';
import { ICallers } from '../model/ICallers';
import { INTERVAL_SLIDE } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { ISport } from '../model/ISport';
import { INews } from '../model/INews';
import { IWeather } from '../model/IWeather';
import { IRate } from '../model/IRate';
import { IRuleDetector } from '../model/IRuleDetector';
import { ITheme } from '../model/ITheme';
import { FirebaseService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  theme: ITheme;
  code!: number;

  availableMods: BehaviorSubject<ISlideLoaded> =
    new BehaviorSubject<ISlideLoaded>({
      content: {
        loaded: false,
      },
      trivia: {
        loaded: false,
      },
      did_you_know: {
        loaded: false,
      },
      a_day_like_today: {
        loaded: false,
      },
      movie: {
        loaded: false,
      },
      review: {
        loaded: false,
      },
      shows: {
        loaded: false,
      },
      instagram: {
        loaded: false,
      },
    });

  isConected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  reelIsReadyToGo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  endPreload: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  display!: IDisplay;

  displayScreen: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  paddingScreen: {
    pb: number;
    pt: number;
    pr: number;
    pl: number;
    ip: number;
  } = {
    pb: 20,
    pt: 20,
    pl: 20,
    pr: 20,
    ip: 10,
  };

  buildDisplay() {
    console.log(this.displayNumber);

    switch (this.displayNumber) {
      case 0:
      case 3:
        this.display = IDisplay.CONTENT;
        break;
      case 5:
        this.display = IDisplay.SPORT_FOOTBALL;
        break;
      case 6:
        this.display = IDisplay.SPORT_PADDEL;
        break;
      default:
        this.display = IDisplay.SLIDE_NEWS;

        if (this.callersData.length === 1) this.display = IDisplay.ONE_CALLERS;
        if (this.callersData.length === 2) this.display = IDisplay.TWO_CALLERS;
        if (this.callersData.length === 3) this.display = IDisplay.THRE_CALLERS;
        if (this.callersData.length === 4) this.display = IDisplay.FOUR_CALLERS;
        if (this.callersData.length === 5) this.display = IDisplay.FIVE_CALLERS;
        if (this.callersData.length === 0 && this.configsData?.logo)
          this.display = IDisplay.LOGO;

        break;
    }
  }

  sportData!: ISport;
  setSportData(sportData: ISport) {
    this.sportData = sportData;
  }

  newsData: INews[] = [];
  setNewsData(newsData: INews[]) {
    this.newsData = newsData;
  }

  wheaterDataList: IWeather[] = [];
  setWheaterDataList(wheaterDataList: IWeather[]) {
    this.wheaterDataList = wheaterDataList;
  }
  exchangeData: IRate[] = [];
  setExchangeData(exchangeData: IRate[]) {
    this.exchangeData = exchangeData;
  }

  callersData: ICallers[] = [];
  setCallersData(callersData: ICallers[]) {
    this.callersData = callersData;
  }

  completeReel: boolean = false;
  iniModules: string[] = [];

  reel: ISlideType[] = [];
  currentSportData: any;

  constructor(
    private securityService: SecurityService,
    private firebaseService: FirebaseService,
    private http: HttpService,
    private platform: Platform
  ) {
    this.availableMods.subscribe((value: ISlideLoaded | any) => {
      this.reel = [];
      const maxLoaded: any = Object.keys(value).length;
      let currentLoaded = 0;
      Object.keys(value).forEach((key: string) => {
        if (value[key].loaded) {
          currentLoaded++;
        }
      });
      if (maxLoaded === currentLoaded) {
        //Distribuye Content

     
        value.content.items.forEach((element: any) => {
          if (element.source === 'image') this.reel.push(ISlideType.IMAGE);
          if (element.source === 'video') this.reel.push(ISlideType.VIDEO);
        });
        

        //Apply priority to detector age

        if (value.trivia.loaded && this.configsData?.modules?.trivia.enable)
          this.reel = updateReel(
            this.configsData?.modules?.trivia.repeat,
            ISlideType.TRIVIA,
            this.reel
          );
        if (
          value.a_day_like_today.loaded &&
          this.configsData?.modules?.a_day_like_today.enable
        )
          this.reel = updateReel(
            this.configsData?.modules?.a_day_like_today.repeat,
            ISlideType.LIKETODAY,
            this.reel
          );

        if (
          value.did_you_know.loaded &&
          this.configsData?.modules?.did_you_know.enable
        )
          this.reel = updateReel(
            this.configsData?.modules?.did_you_know.repeat,
            ISlideType.DIDYOUNOW,
            this.reel
          );

        if (value.movie.loaded && this.configsData?.modules?.movie.enable)
          this.reel = updateReel(
            this.configsData?.modules?.movie.repeat,
            ISlideType.MOVIE,
            this.reel
          );
        if (value.shows.loaded && this.configsData?.modules?.show.enable)
          this.reel = updateReel(
            this.configsData?.modules?.show.repeat,
            ISlideType.SHOWS,
            this.reel
          );

        if (value.instagram.loaded && this.configsData?.instagram_enabled) {
          this.reel = updateReel(
            this.configsData?.instagram_max_displayed,
            //this.configsData?.modules?.instagram.repeat,
            ISlideType.INSTAGRAM,
            this.reel
          );
        }

        if (value.review.loaded && this.configsData?.modules?.review.enable)
          this.reel = updateReel(
            this.configsData?.modules?.review.repeat,
            ISlideType.REVIEWS,
            this.reel
          );
        console.log(this.reel);

        this.completeReel = true;
        if (!this.reelIsReadyToGo.value) this.reelIsReadyToGo.next(true);
      }
    });

    this.updateDevice();

    this.theme = {
      backgroundColor: 'rgb(233 236 243)',
      primaryColor: '#00274E',
      secondaryColor: 'rgb(233 236 243)',
      thirdColor: '#A0C51E',
      notificationColorText: '#FFF',
      backgroundCard: '#FFF',
      sliderColorActive: '#00274E',
      sliderColorDisabled: '#A0C51E',
    };
    toStorage('THEME', JSON.stringify(this.theme));
  }

  pendingConfigs: boolean = false;
  fetchedConfigs: boolean = false;
  configsData!: IConfig;
  blockAccount: boolean = false;
  displayNumber: number = 0;
  buildConfig(
    callback: Function,
    response: { code: number; error: string } = { code: 200, error: '' }
  ) {
    let deviceID = fromStorage('X-Device-ID');
    if (
      this.configsData &&
      this.configsData?.display_options &&
      Array.isArray(this.configsData?.display_options)
    ) {
      if (this.configsData?.firebase)
        this.firebaseService.createMachine(this.configsData.uuid, deviceID);
      else {
        let found = false;
        this.buildTheme();
        this.configsData?.display_options.forEach((element) => {
          if (element.machine_key === deviceID) {
            found = true;
            this.displayNumber = element.display;
            if (element?.position) {
              this.paddingScreen = {
                pb: element?.position['margin-bottom'] ?? 10,
                pt: element?.position['margin-top'] ?? 10,
                pl: element?.position['margin-left'] ?? 10,
                pr: element?.position['margin-right'] ?? 10,
                ip: element?.position['inner-padding'] ?? 10,
              };
            }
            this.displayScreen.next(this.displayNumber);
            this.buildDisplay();
          }
        });

        if (!found) {
          this.displayNumber = 0;
          this.paddingScreen = {
            pb: 10,
            pt: 10,
            pl: 10,
            pr: 10,
            ip: 10,
          };
          this.displayScreen.next(this.displayNumber);
          this.buildDisplay();
        }
      }

      this.configsData.wheater = true;
      this.configsData.forecast = true;
      if (!this.fetchedConfigs) this.renderDynamic();

      this.pendingConfigs = false;
      this.fetchedConfigs = true;
      toStorage('CONFIGS', JSON.stringify(this.configsData));
    }
    callback(response.code);
  }

  buildTheme() {
    this.theme = {
      backgroundColor: this.configsData.background_color ?? 'rgb(233 236 243)',
      primaryColor: this.configsData.primary_color ?? '#00274E',
      secondaryColor: this.configsData.secondary_color ?? 'rgb(233 236 243)',
      thirdColor: this.configsData.third_color ?? '#A0C51E',
      notificationColorText: this.configsData.notification_color_text ?? '#FFF',
      backgroundCard: this.configsData.background_card ?? '#FFF',
      sliderColorActive: this.configsData.slider_color_active ?? '#00274E',
      sliderColorDisabled: this.configsData.slider_color_disabled ?? '#A0C51E',
    };
  }

  fetchConfigs(callback: Function) {
    if (this.isConected.value) {
      printInfo('CALL CONFIG ONLINE');
      if (!this.fetchedConfigs) this.pendingConfigs = true;
      this.http.call({ method: 'GET', path: '/configs' }).subscribe(
        (response) => {
          this.configsData = response.data;
          this.blockAccount = false;
          this.buildConfig(callback, response);
        },
        (e) => {
          if (fromStorage('CONFIGS')) {
            this.configsData = JSON.parse(fromStorage('CONFIGS') as string);
            this.buildConfig(callback);
          } else {
            if (e?.error?.error)
              this.securityService.presentToast(e?.error?.error);
            else this.securityService.presentToast('Too many connections');
          }
          if (e?.error?.error?.code === 402) this.blockAccount = true;
          this.buildConfig(callback, e.error);
        }
      );
    } else {
      if (fromStorage('CONFIGS')) {
        printInfo('CALL CONFIG OFFINE');
        this.configsData = JSON.parse(fromStorage('CONFIGS') as string);
        this.buildConfig(callback);
      }
    }
  }

  renderDynamic() {
    let isSport =
      this.configsData?.football === true && !!this.sportData?.minute;
    this.clean();
    setTimeout(() => {
      if (isSport) {
        this.showService('S');
        this.a = setTimeout(() => {
          this.renderDynamic();
        }, INTERVAL_SLIDE);
      } else {
        if (this.configsData?.wheater && this.wheaterDataList.length > 0) {
          this.showService('W');
          this.b = setTimeout(() => {
            if (this.configsData?.news && this.newsData.length > 0) {
              this.showService('N');
              this.c = setTimeout(() => {
                if (
                  this.configsData?.exchanges &&
                  this.exchangeData.length > 0
                ) {
                  this.showService('E');
                  this.d = setTimeout(() => {
                    this.renderDynamic();
                  }, INTERVAL_SLIDE);
                } else {
                  this.renderDynamic();
                }
              }, INTERVAL_SLIDE * this.newsData.length);
            } else {
              if (this.configsData?.exchanges && this.exchangeData.length > 0) {
                this.showService('E');
                this.e = setTimeout(() => {
                  this.renderDynamic();
                }, INTERVAL_SLIDE);
              }
            }
          }, INTERVAL_SLIDE * 3);
        } else {
          this.f = setTimeout(() => {
            this.renderDynamic();
          }, 1000);
        }
      }
    }, 200);
  }

  a: any;
  b: any;
  c: any;
  d: any;
  e: any;
  f: any;
  g: any;
  loadingDynamic: boolean = true;

  clean() {
    if (this.a) clearTimeout(this.a);
    if (this.b) clearTimeout(this.b);
    if (this.c) clearTimeout(this.c);
    if (this.e) clearTimeout(this.e);
    if (this.d) clearTimeout(this.d);
    if (this.f) clearTimeout(this.f);
    if (this.g) clearTimeout(this.g);
  }

  clearTimeOut(resource: any) {
    if (resource) clearTimeout(resource);
  }

  /* BUILD DINAMIC SLIDE */
  showNews: boolean = false;
  showWheater: boolean = false;
  showSport: boolean = false;
  showExchange: boolean = false;

  showService(serviceShow: string) {
    console.log('serviceShow:' + serviceShow);

    this.loadingDynamic = false;
    if (serviceShow === 'W') {
      this.showWheater = true;
      this.showSport = false;
      this.showExchange = false;
      this.showNews = false;
    }

    if (serviceShow === 'E') {
      this.showWheater = false;
      this.showSport = false;
      this.showExchange = true;
      this.showNews = false;
    }

    if (serviceShow === 'N') {
      this.showWheater = false;
      this.showSport = false;
      this.showExchange = false;
      this.showNews = true;
    }

    if (serviceShow === 'S') {
      this.showWheater = false;
      this.showSport = true;
      this.showExchange = false;
      this.showNews = false;
    }
  }

  heightWeatherLarge: number = 0;

  heightSlide: number = 400;
  widthSlide: number = 400;

  updateDevice() {
    this.heightWeatherLarge = this.platform.height() - 28 * 2;

    this.heightSlide = (this.platform.height() * 60) / 100;
    this.widthSlide = (this.platform.width() * 60) / 100 - 28 * 2;

    if (this.display === IDisplay.SLIDE_NEWS)
      this.heightWeatherLarge = this.platform.height() - 28 * 2;

    if (this.display === IDisplay.CONTENT) {
      this.heightSlide = this.platform.height();
      this.widthSlide = this.platform.width();
    }

    if (this.display === IDisplay.ONE_CALLERS) {
      this.heightSlide = this.platform.height();
      this.widthSlide = (this.platform.width() * 60) / 100;
      this.heightWeatherLarge = (this.platform.height() * 40) / 100;
    }

    if (this.display === IDisplay.LOGO) {
      this.heightSlide = this.platform.height();
      this.widthSlide = (this.platform.width() * 60) / 100;
      this.heightWeatherLarge = (this.platform.height() * 40) / 100;
    }

    if (this.display === IDisplay.THRE_CALLERS) {
      this.heightWeatherLarge = (this.platform.height() * 60) / 100 - 28 * 2;
    }
  }

  rulesDetector: IRuleDetector[] = [];
  fetchRulesDetector(callback?: Function) {
    this.http.call({ method: 'GET', path: '/detectors' }).subscribe(
      (response: any) => {
        let deviceID: any = fromStorage('X-Device-ID');
        if (response.data && response.data[deviceID]) {
          this.rulesDetector = response.data[deviceID] ?? [];
        }
        if (typeof callback === 'function') callback();
      },
      (e) => {
        if (typeof callback === 'function') callback();
      }
    );
  }
}

/*
value: 0,
    label: "horizontal fullscreen",
    icon: () => <div style={{ width: 20, height: 15, marginRight: 10, border: "1px solid #A0C51E", borderWidth: 3 }}></div>

}, {
    value: 1,
    label: "horizontal",
    icon: () => <div className='flex flex-row justify-start'>
        <div style={{ width: 10, height: 15, border: "1px solid #A0C51E", borderWidth: 3 }}></div>
        <div style={{ width: 10, height: 15, marginRight: 10, border: "1px solid #A0C51E", borderWidth: 3, borderTopWidth: 8 }}></div>
    </div>

}, {
    value: 2,
    label: "vertical",
    icon: () => <div className='flex flex-col justify-start'>
        <div style={{ width: 15, height: 5, border: "1px solid #A0C51E", borderWidth: 5 }}></div>
        <div style={{ width: 15, height: 8, marginRight: 10, border: "1px solid #A0C51E", borderWidth: 1 }}></div>
        <div style={{ width: 15, height: 5, marginRight: 10, border: "1px solid #A0C51E", borderWidth: 3 }}></div>

    </div>
}, {
    value: 4,
    label: "vertical invert",
    icon: () => <div className='flex flex-col justify-start'>
        <div style={{ width: 15, height: 5, border: "1px solid #A0C51E", borderWidth: 3 }}></div>
        <div style={{ width: 15, height: 8, marginRight: 10, border: "1px solid #A0C51E", borderWidth: 1 }}></div>
        <div style={{ width: 15, height: 5, marginRight: 10, border: "1px solid #A0C51E", borderWidth: 5 }}></div>

    </div>
},{
    value: 3,
    */
