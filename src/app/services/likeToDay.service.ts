import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IlikeToDay } from '../model/IlikeToDay';

import { printInfo } from '../util/common';
import { cleanStorage, fromStorage, toStorage, uuid } from '../util/storage';
import { AppConfigService } from './app-config.service';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class LikeToDayService {
  // frecuencyShow: number = 2;
  constructor(
    public platform: Platform,
    private appConfigService: AppConfigService,
    private http: HttpService
  ) {}

  //FETCH EXCHANGE
  pendingLikeToDay: boolean = false;
  likeToDayData: IlikeToDay[] = [];

  registerModule() {
    this.appConfigService.availableMods.next({
      ...this.appConfigService.availableMods.value,
      a_day_like_today: {
        loaded: true,
        items: this.likeToDayData,
      },
    });
  }

  buildTikeToDay() {
    this.pendingLikeToDay = false;
    this.registerModule();
    toStorage('LIKETODAY', JSON.stringify(this.likeToDayData));
  }

  getNextLikeToDayItem() {
    let next: IlikeToDay | any;
    if (this.likeToDayData.filter((e) => !e.maskAsView).length === 0) {
      this.likeToDayData = this.likeToDayData.map((e) => ({
        ...e,
        maskAsView: false,
      }));
      toStorage('REPLACE-LIKETODAY', JSON.stringify(true));
    }

    if (this.likeToDayData.filter((e) => !e.maskAsView).length > 0) {
      next = this.likeToDayData.filter((e) => !e.maskAsView)[0];
      let index = this.likeToDayData.findIndex((e) => e.uuid === next.uuid);
      this.likeToDayData[index].maskAsView = true;
    }
    toStorage('LIKETODAY', JSON.stringify(this.likeToDayData));

    return next;
  }
  fetchTikeToDay() {
    if (this.appConfigService.configsData?.modules?.a_day_like_today.enable)
      this.appConfigService.iniModules.push('A day like to days');
    this.pendingLikeToDay = true;
    cleanStorage('REPLACE-LIKETODAY');
    this.http.call({ method: 'GET', path: '/a-day-like-todays' }).subscribe(
      (response) => {                
        this.likeToDayData = response.a_day_like_today.map((e:any ) => ({
          ...e,
          uuid: uuid(),
          maskAsView: false,
        }));
        this.buildTikeToDay();
        this.appConfigService.iniModules =
          this.appConfigService.iniModules.filter(
            (e) => e != 'A day like to days'
          );
      },
      (e) => {
        if (fromStorage('LIKETODAY')) {
          this.likeToDayData = JSON.parse(fromStorage('LIKETODAY') as string);
          this.buildTikeToDay();
        }
      }
    );
  }
}
