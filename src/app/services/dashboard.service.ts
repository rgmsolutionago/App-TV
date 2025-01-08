import { Injectable } from '@angular/core';
import { ReadFileResult } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import * as moment from 'moment';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { DEFAULT_CONTENT_IMAGE } from 'src/environments/environment';

import { ICallers } from '../model/ICallers';
import { ISlideType } from '../model/IConfig';
import { IContent, IDisplay } from '../model/IContent';
import { IDevice } from '../model/IDevice';
import { IForecast } from '../model/IForecast';
import { INews } from '../model/INews';
import { IRate } from '../model/IRate';
import { IRuleDetector } from '../model/IRuleDetector';
import { ISport } from '../model/ISport';
import { IWeather } from '../model/IWeather';
import {
  distributeVideos,
  printInfo,
  registerLog,
  types,
} from '../util/common';
import { cleanStorage, fromStorage, toStorage, uuid } from '../util/storage';
import { AppConfigService } from './app-config.service';

import { HttpService } from './http.service';
import { SlideStaticManagerService } from './slide-static-manager.service';
import { FirebaseService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  refreshContent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  nextSlideIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  keyboardEventCall: boolean = false;
  keyboardEventCallAsFullScreen: boolean = false;
  keyboardEventCallCaller!: ICallers | any;
  hasDownloadFile: boolean = false;
  videoRenderID: { id: string; slideID: string } = { id: '-1', slideID: '-1' };
  currentSlideIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    public platform: Platform,
    private firebaseService: FirebaseService,
    private appConfigService: AppConfigService,
    private http: HttpService,
    private slideStaticManagerService: SlideStaticManagerService
  ) {}

  //FETCH CALLERS
  pendingCallers: boolean = false;
  hasFetchedCallers: boolean = false;
  callersData: ICallers[] = [];

  restartCallers() {
    this.callersData = this.callersData.map((e) => ({ ...e, number: 0 }));
  }
  buildCallers(callback: Function) {
    this.callersData = this.callersData.map((e: ICallers) => ({
      ...e,
      number: this.getCaller(e.name).number,
      linkedNumber: this.getCaller(e.name).linkedNumber,
      hasTouched: this.getCaller(e.name).hasTouched,
    }));
    this.pendingCallers = false;
    this.appConfigService.setCallersData(this.callersData);
    toStorage('CALLERS', JSON.stringify(this.callersData));
    if (typeof callback === 'function') callback();
    this.appConfigService.buildDisplay();
    this.hasFetchedCallers = true;
  }
  fetchCallers(callback: Function) {
    if (this.appConfigService.isConected.value) {
      printInfo('CALL CALLERS ON');
      this.pendingCallers = true;
      this.http.call({ method: 'GET', path: '/callers' }).subscribe(
        (response) => {
          this.callersData = response.data;
          this.buildCallers(callback);
        },
        (e) => {
          if (fromStorage('CALLERS')) {
            this.callersData = JSON.parse(fromStorage('CALLERS') as string);
            this.buildCallers(callback);
          }
        }
      );
    } else {
      if (fromStorage('CALLERS')) {
        if (fromStorage('CALLERS')) {
          this.callersData = JSON.parse(fromStorage('CALLERS') as string);
          this.buildCallers(callback);
        }
      }
    }
  }

  //FETCH NEWS
  pendingNews: boolean = false;
  newsData: INews[] = [];

  buildNews() {
    this.pendingNews = false;
    this.appConfigService.setNewsData(this.newsData);
    toStorage('NEWS', JSON.stringify(this.newsData));
  }
  fetchNews() {
    if (this.appConfigService.isConected.value) {
      printInfo('CALL NEWS ON');
      this.pendingNews = true;
      this.http.call({ method: 'GET', path: '/news' }).subscribe(
        (response) => {
          this.newsData = response.data;
          this.buildNews();
        },
        (e) => {
          if (fromStorage('NEWS')) {
            this.newsData = JSON.parse(fromStorage('NEWS') as string);
            this.buildNews();
          }
        }
      );
    } else {
      if (fromStorage('NEWS')) {
        this.newsData = JSON.parse(fromStorage('NEWS') as string);
        this.buildNews();
      }
    }
  }

  //FETCH EXCHANGE
  pendingExchange: boolean = false;
  exchangeData: IRate[] = [];

  buildExchange() {
    this.pendingExchange = false;
    this.appConfigService.setExchangeData(this.exchangeData);
    toStorage('EXCHANGE', JSON.stringify(this.exchangeData));
  }
  fetchExchange() {
    if (this.appConfigService.isConected.value) {
      printInfo('CALL EXCHANGE ON');
      this.pendingExchange = true;
      this.http.call({ method: 'GET', path: '/exchange' }).subscribe(
        (response) => {
          this.exchangeData = response.data;
          this.buildExchange();
        },
        (e) => {
          if (fromStorage('EXCHANGE')) {
            this.exchangeData = JSON.parse(fromStorage('EXCHANGE') as string);
            this.buildExchange();
          }
        }
      );
    } else {
      const exchangeStorage = fromStorage('EXCHANGE');

      if (exchangeStorage && exchangeStorage !== 'undefined') {
        this.exchangeData = JSON.parse(fromStorage('EXCHANGE') as string);
        this.buildExchange();
      }
    }
  }

  //FETCH WHEATER
  pendingWheater: boolean = false;
  wheaterData!: IWeather;
  forecastData: IForecast[] = [];
  forecastDataToday!: IForecast;
  wheaterDataList: IWeather[] = [];
  buildWheater() {
    this.appConfigService.setWheaterDataList(this.wheaterDataList);
    toStorage('WHEATHER', JSON.stringify(this.wheaterDataList));
  }
  fetchWheater() {
    if (this.appConfigService.isConected.value) {
      printInfo('CALL WHEATER ON');
      this.pendingWheater = true;

      let request: any = {
        requestWheater: this.http.call({ method: 'GET', path: '/weather' }),
        requestForescast: this.http.call({ method: 'GET', path: '/forecast' }),
      };

      forkJoin(request).subscribe(
        (results: any) => {
          let requestWheaterResponse, requestForescastResponse;
          if (results.requestWheater)
            requestWheaterResponse = results.requestWheater;
          if (results.requestForescast)
            requestForescastResponse = results.requestForescast;

          this.forecastData = requestForescastResponse.data.sort(
            (a: IForecast, b: IForecast) => {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            }
          );
          this.forecastDataToday = this.forecastData[0];
          this.forecastData = this.forecastData.slice(1);
          this.wheaterData = requestWheaterResponse.data;

          this.wheaterDataList = [];
          this.pendingWheater = false;
          this.wheaterDataList.push({
            ...this.wheaterData,
            max_temperature: this.forecastDataToday?.max_temperature,
            min_temperature: this.forecastDataToday?.min_temperature,
            isToday: true,
          });
          this.forecastData.forEach((element) => {
            this.wheaterDataList.push({
              ...element,
              temp_c: element.avg_temperature,
              isToday: false,
            });
          });
          this.buildWheater();
        },
        () => {
          if (fromStorage('WHEATHER')) {
            this.wheaterDataList = JSON.parse(
              fromStorage('WHEATHER') as string
            );
            this.buildWheater();
          }
        }
      );
    } else {
      if (fromStorage('WHEATHER')) {
        this.wheaterDataList = JSON.parse(fromStorage('WHEATHER') as string);
        this.buildWheater();
      }
    }
  }

  //FETCH SPORT
  pendingSport: boolean = false;
  sportData!: ISport;

  buildSport() {
    this.pendingSport = false;

    if (this.sportData.minute === '') {
      this.appConfigService.configsData.wheater = true;
      this.appConfigService.configsData.forecast = true;
    }
    this.appConfigService.setSportData(this.sportData);
    toStorage('SPORT', JSON.stringify(this.sportData));
  }

  fetchSport() {
    if (this.appConfigService.isConected.value) {
      printInfo('CALL SPORT ON');
      this.pendingSport = true;
      this.http.call({ method: 'GET', path: '/sport/football' }).subscribe(
        (response) => {
          this.sportData = response.data;
          this.buildSport();
        },
        (e) => {
          if (fromStorage('SPORT')) {
            this.sportData = JSON.parse(fromStorage('SPORT') as string);
            this.buildSport();
          }
        }
      );
    } else {
      if (fromStorage('SPORT')) {
        this.sportData = JSON.parse(fromStorage('SPORT') as string);
        this.buildSport();
      }
    }
  }

  //FETCH FORECAST

  pushDeviceInfo(deviceInfo: IDevice) {
    printInfo('CALL DEVICEINFO OFF');
    this.firebaseService.updateMachine(
      this.appConfigService.configsData.uuid,
      deviceInfo
    );
    let deviceID = fromStorage('X-Device-ID');

    if (!deviceID?.includes('Too many connections'))
      this.http
        .call({
          method: 'POST',
          path: `/machine/${deviceID}`,
          payload: {
            ...deviceInfo,
          },
        })
        .subscribe(
          (response) => {},
          (e) => {}
        );
  }

  clearTimeOut(resource: any) {
    if (resource) clearTimeout(resource);
  }

  //CALLER STORATE
  callerStorageID: string = 'callerStorageID';
  toSaveCaller(callerID: any, data: any) {
    if (!fromStorage(this.callerStorageID))
      toStorage(this.callerStorageID, JSON.stringify({}));

    let callerStorage = JSON.parse(fromStorage(this.callerStorageID) as string);
    Object.assign(callerStorage, { [callerID]: data });
    toStorage(this.callerStorageID, JSON.stringify(callerStorage));

    if (this.appConfigService.display === IDisplay.SPORT_FOOTBALL) {
      let sportData = {};
      if (callerID === 'Equipo A') sportData = { teamAScore: data.number };
      if (callerID === 'Equipo B') sportData = { teamBScore: data.number };
      this.firebaseService.updateEmissionSportData(
        this.appConfigService.configsData.uuid,
        {
          ...sportData,
        }
      );
    }

    if (this.appConfigService.display === IDisplay.SPORT_PADDEL) {
      let sportData = this.getPaddelValues(callerID, data);
      console.log(sportData);

      this.firebaseService.updateEmissionSportData(
        this.appConfigService.configsData.uuid,
        {
          ...sportData,
        }
      );
    }
  }
  currentCallerName: string = '';
  getCaller(callerID: any) {
    if (!fromStorage(this.callerStorageID))
      toStorage(this.callerStorageID, JSON.stringify({}));

    let callerStorage = JSON.parse(fromStorage(this.callerStorageID) as string);
    if (callerStorage[callerID]) return callerStorage[callerID];
    else return { number: 0, linkedNumber: 0, hasTouched: false };
  }

  //FETCH CONTENTS

  currentContent!: IContent;
  currentIndexContent: number = 0;
  updateChange: boolean = false;

  resourceID: any;
  typeSlideToShow: ISlideType = ISlideType.IMAGE;
  controlShowContent: number = 0;
  controlNextContent!: ISlideType;

  nextReelIndex: number = 0;

  startContent() {
    this.updateChange = true;
    if (this.appConfigService.reel.length > 0) {
      this.nextReelIndex = 0;
      this.typeSlideToShow = this.appConfigService.reel[0];
      setTimeout(() => (this.updateChange = false), 100); //STOP EFFECT SLIDE
    }
  }

  nextContent() {
    this.updateChange = true;
    this.nextReelIndex = this.nextReelIndex + 1;
    if (
      this.nextReelIndex === this.appConfigService.reel.length) {
      this.nextReelIndex = 0;
      this.appConfigService.availableMods.next({
        ...this.appConfigService.availableMods.value,
        content: {
          loaded: false,
          items: [],
        },
      });
      this.appConfigService.reelIsReadyToGo.next(false);
      this.fetchContents();
    } else {
      this.typeSlideToShow = this.appConfigService.reel[this.nextReelIndex];
    }
    setTimeout(() => (this.updateChange = false), 100); //STOP EFFECT SLIDE
  }

  isImage(content: IContent) {
    return (
      content.url.endsWith('.png') ||
      content.url.endsWith('.jpg') ||
      content.url.endsWith('.jpeg')
    );
  }

  getExt(content: IContent) {
    try {
      return content.url.split('.')[content.url.split('.').length - 1];
    } catch (e) {
      registerLog(JSON.stringify(e));
      return '';
    }
  }

  getMimeType(content: IContent) {
    let v: any =
      types[content.url.split('.')[content.url.split('.').length - 1]];
    return v;
  }

  sortAndFilterContentDataData(contentsData: IContent[]) {
    return contentsData
      .map((e) => ({
        ...e,
      }))
      .map((e) => ({
        ...e,
        source: this.isImage(e) ? 'image' : 'video',
        ext: this.getExt(e),
        mime: this.getMimeType(e),
        time: e.time === 0 ? DEFAULT_CONTENT_IMAGE : e.time,
        downloading: false,
      }))
      .sort((a: IContent, b: IContent) => a.position - b.position);
  }

  detectedBackendDeletecFiles(backContentsData: IContent[]) {
    let deleteNameFile: any = [];
    let staticInfo = this.slideStaticManagerService.mediaAsDownloadedInfo();
    staticInfo.forEach((element) => {
      let index = backContentsData.findIndex((e) => e.name === element.name);
      if (index === -1) deleteNameFile.push(element);
    });
    return deleteNameFile;
  }

  removeFirst(arr: any) {
    return arr.filter((e: any) => e.name !== 'start-of-array');
  }

  pendingContents: boolean = false;
  contentsData: IContent[] = [];

  buildContent(contentsData: IContent[]) {
    let newContentsData = this.removeFirst(
      this.sortAndFilterContentDataData(contentsData)
    );
    let lastContentsData = this.removeFirst(
      this.sortAndFilterContentDataData(this.contentsData)
    );

    let deletedDeviceNameFiles =
      this.detectedBackendDeletecFiles(newContentsData);

    if (lastContentsData.length === 0) this.contentsData = newContentsData;
    else {
      let hasChange = false;
      if (lastContentsData.length !== newContentsData.length) hasChange = true;
      else {
        for (let index = 0; index < lastContentsData.length; index++) {
          if (newContentsData[index].name !== lastContentsData[index].name)
            hasChange = true;
        }
      }
      if (hasChange) this.contentsData = newContentsData;
    }

    this.contentsData = newContentsData;
    // this.addFirst();

    this.currentContent = this.contentsData[0];
    this.currentIndexContent = 0;

    let repetitions = {};
    this.contentsData.forEach((element) => {
      Object.assign(repetitions, {
        [element.name]: element.repeat ? element.repeat : 1,
      });
    });
    const reelDistributoin = distributeVideos(repetitions);
    const list: any = [];
    reelDistributoin.forEach((name: any) => {
      let item: any = this.contentsData.find((e: any) => e.name === name);
      list.push({ ...item, oldname: item.name });
    });
    this.contentsData = list.map((e: any) => ({
      ...e,
      maskAsView: false,
      uuid: uuid(),
    }));

    //Apply priority to detector age
    let itemsContent: IContent[] = [];
    if (this.appConfigService.rulesDetector.length > 0) {
      const rule: IRuleDetector = this.appConfigService.rulesDetector[0];
      let withRule: IContent[] = [];
      let withOutRule: IContent[] = [];
      this.contentsData.forEach((element) => {
        if (element.age === rule.average_age) withRule.push(element);
        else withOutRule.push(element);
      });
      itemsContent = withRule.concat(withOutRule);
    } else {
      itemsContent = this.contentsData;
    }

    this.contentsData = itemsContent;
    //

    toStorage('CONTENT', JSON.stringify(this.contentsData));

    this.appConfigService.availableMods.next({
      ...this.appConfigService.availableMods.value,
      content: {
        loaded: true,
        items: this.contentsData,
      },
    });

    this.downloadContent();
    deletedDeviceNameFiles.forEach((element: any) => {
      this.slideStaticManagerService.removeMediaResource(element);
    });
  }

  getNextContentItem() {
    let next: IContent | any;
    if (this.contentsData.filter((e) => !e.maskAsView).length === 0) {
      this.contentsData = this.contentsData.map((e) => ({
        ...e,
        maskAsView: false,
      }));
      toStorage('CONTENT', JSON.stringify(this.contentsData));
    }

    if (this.contentsData.filter((e) => !e.maskAsView).length > 0) {
      next = this.contentsData.filter((e) => !e.maskAsView)[0];
      let index = this.contentsData.findIndex((e) => e.uuid === next.uuid);
      this.contentsData[index].maskAsView = true;
    }
    toStorage('CONTENT', JSON.stringify(this.contentsData));

    return next;
  }
  updateLoadMedia(element: IContent) {
    this.slideStaticManagerService
      .getMediaResource(element)
      .then((readFileResult: ReadFileResult) => {
        if (readFileResult && readFileResult.data) {
          //if (element.source !== 'video')
          element.base64 = `data:${element.source}/${element.ext};base64,${readFileResult.data}`;
          if (!element.poster)
            element.poster = this.slideStaticManagerService.getStorageThumb(
              element.name
            );
          this.hasDownloadFile = true;
        }

        let countDownloaded = this.contentsData.filter(
          (e) => e.base64 != '' && e.name !== 'start-of-array'
        ).length;
        let countDownloading = this.contentsData.filter(
          (e) => e.name !== 'start-of-array'
        ).length;

        if (
          this.slideStaticManagerService.hasAsDownloadedComplete() &&
          countDownloaded === countDownloading
        )
          this.pendingContents = false;
      })
      .catch((error) => {});
  }

  countDownloaded: number = 0;
  countDownloading: number = 0;
  downloadContent() {
    this.contentsData.forEach((element: IContent) => {
      if (
        !this.slideStaticManagerService.hasRegistredMediaToDownload(
          element.name
        )
      )
        this.slideStaticManagerService.registredMediaStatus(
          element.name,
          false,
          false,
          element.ext,
          element.poster
        );
    });

    this.countDownloaded =
      this.slideStaticManagerService.getDownloadingCompleteCount();
    this.countDownloading = this.slideStaticManagerService.getDownloadedCount();

    this.contentsData.forEach((element: IContent) => {
      if (element.name !== 'start-of-array') {
        if (this.slideStaticManagerService.mediaStopDownloaded(element.name)) {
          this.updateLoadMedia(element);
        } else {
          element.downloading = true;
          if (
            !this.slideStaticManagerService.mediaStartDownloaded(element.name)
          ) {
            this.slideStaticManagerService.registredMediaStatus(
              element.name,
              true,
              false,
              element.ext,
              element.poster
            );
            this.slideStaticManagerService
              .downloadMediaResource(element)
              .then((r) => {
                this.slideStaticManagerService.registredMediaStatus(
                  element.name,
                  true,
                  true,
                  element.ext,
                  element.poster
                );
                element.downloading = false;
                this.updateLoadMedia(element);

                this.countDownloaded =
                  this.slideStaticManagerService.getDownloadingCompleteCount();
                this.countDownloading =
                  this.slideStaticManagerService.getDownloadedCount();
              })
              .catch((e) => {
                this.slideStaticManagerService.registredMediaStatus(
                  element.name,
                  false,
                  false,
                  element.ext,
                  element.poster
                );
              });
          }
        }
      }
    });
  }
  resource: any;
  fetchContents() {
 
    if (this.appConfigService.isConected.value) {
      printInfo('CALL CONTENT ON');
      this.pendingContents = true;
      this.contentsData = [];
      this.http.call({ method: 'GET', path: '/contents' }).subscribe(
        (response) => {
          if (response.data.contents.length > 0)
            this.buildContent(response.data.contents);
          else {
            this.resource = setTimeout(() => {
              this.fetchContents();
              if(this.resource)
              this.clearTimeOut(this.resource);
            }, 5000);
          }
        },
        (e) => {
          if (e.status === 404) {
            this.buildContent([]);
          } else {
            if (fromStorage('CONTENT')) {
              this.buildContent(JSON.parse(fromStorage('CONTENT') as string));
            } else {
            }
          }
        }
      );
    } else {
      if (fromStorage('CONTENT')) {
        this.buildContent(JSON.parse(fromStorage('CONTENT') as string));
      } else {
      }
    }
  }

  recopilationNumeratorData(
    numeratorID: string,
    isAdd: boolean,
    value: number
  ) {
    if (!fromStorage('NumeratorLog'))
      toStorage('NumeratorLog', JSON.stringify({}));

    let numeratorLoggger = JSON.parse(fromStorage('NumeratorLog') as string);
    if (!numeratorLoggger[numeratorID]) numeratorLoggger[numeratorID] = 0;

    if (isAdd)
      numeratorLoggger[numeratorID] = numeratorLoggger[numeratorID] + 1;
    else {
      numeratorLoggger[numeratorID] = numeratorLoggger[numeratorID] - 1;
    }

    numeratorLoggger[numeratorID] = value;

    toStorage('NumeratorLog', JSON.stringify(numeratorLoggger));

    if (!fromStorage('NumeratorLogHistorical'))
      toStorage('NumeratorLogHistorical', JSON.stringify({}));

    let NumeratorLogHistorical = JSON.parse(
      fromStorage('NumeratorLogHistorical') as string
    );
    if (!NumeratorLogHistorical[numeratorID])
      NumeratorLogHistorical[numeratorID] = [];

    if (value !== -1) {
      let duration;
      if (NumeratorLogHistorical[numeratorID].length > 0) {
        let latestDate =
          NumeratorLogHistorical[numeratorID][
            NumeratorLogHistorical[numeratorID].length - 1
          ].pressDate;
        duration = moment.duration(moment().diff(latestDate));
      }

      NumeratorLogHistorical[numeratorID].push({
        order: NumeratorLogHistorical[numeratorID]
          ? NumeratorLogHistorical[numeratorID].length + 1
          : 1,
        value: value,
        pressDate: moment().toDate().toISOString(),
        humanDuration: duration ? duration.humanize() : ' - ',
        duration: duration ? duration.asMilliseconds() : ' - ',
        durationRespectDate:
          NumeratorLogHistorical[numeratorID] &&
          NumeratorLogHistorical[numeratorID].length > 0
            ? NumeratorLogHistorical[numeratorID][
                NumeratorLogHistorical[numeratorID].length - 1
              ].pressDate
            : ' - ',
      });
    }
    toStorage('NumeratorLogHistorical', JSON.stringify(NumeratorLogHistorical));
  }
  /*
  {
    {"Carnicería":{
      
    },
    "Fiambrería":{}}
  }
*/

  buildProcess() {
    let dataToSend = {
      numeratorLogHistorical: JSON.parse(
        fromStorage('NumeratorLogHistorical') as string
      ),
      numeratorLog: JSON.parse(fromStorage('NumeratorLog') as string),
    };
    let deviceID = fromStorage('X-Device-ID');
    if (dataToSend.numeratorLogHistorical && dataToSend.numeratorLog) {
      this.http
        .call({
          method: 'POST',
          path: `/machine/${deviceID}/analytics`,
          payload: dataToSend,
        })
        .subscribe(
          (response) => {
            cleanStorage('NumeratorLogHistorical');
            cleanStorage('NumeratorLog');
          },
          (e) => {}
        );
    }
    console.log('SEND DATA ANALYTICS');
  }
  watchResource: any;
  SendIn24: boolean = false;
  sendInfo() {
    var format = 'hh:mm:ss';
    const beforeTime = moment('23:50:00', format);
    const afterTime = moment('23:59:00', format);

    if (this.watchResource) clearInterval(this.watchResource);

    if (this.SendIn24) {
      this.watchResource = setInterval(() => {
        if (moment().isBetween(beforeTime, afterTime)) {
          this.buildProcess();
        }
      }, 10000);
    } else {
      this.watchResource = setInterval(() => {
        this.buildProcess();
      }, 10800000); // 3 Horas
    }
  }

  getPaddelValues(callerID: string, data: any) {
    console.log(this.appConfigService.currentSportData);
    console.log(data);
    console.log(callerID);

    let teamAScore = this.appConfigService.currentSportData.teamAScore;
    let teamBScore = this.appConfigService.currentSportData.teamBScore3;
    1;
    let teamASetScore = this.appConfigService.currentSportData.teamASetScore;
    let teamBSetScore = this.appConfigService.currentSportData.teamBSetScore;
    let teamAGameScore = this.appConfigService.currentSportData.teamAGameScore;
    let teamBGameScore = this.appConfigService.currentSportData.teamBGameScore;

    if (callerID === 'Equipo A') {
      teamAScore = data.number;
      if (teamAScore === 0) {
        teamAGameScore = teamAGameScore + 1;
        teamAScore = 0;
        teamBScore = 0;
      }
      if (teamAGameScore >= 6 && teamAGameScore - teamBGameScore >= 2) {
        teamASetScore = teamASetScore + 1;
        teamAGameScore = 0;
        teamBGameScore = 0;
      }
    }

    if (callerID === 'Equipo B') {
      teamBScore = data.number;
      if (teamBScore === 0) {
        teamBGameScore = teamBGameScore + 1;
        teamAScore = 0;
        teamBScore = 0;
      }
      if (teamBGameScore >= 6 && teamBGameScore - teamAGameScore >= 2) {
        teamBSetScore = teamBSetScore + 1;
        teamAGameScore = 0;
        teamBGameScore = 0;
      }
    }

    return {
      teamAScore,
      teamBScore,
      teamASetScore,
      teamBSetScore,
      teamAGameScore,
      teamBGameScore,
    };
  }
}
