import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DidYouKnow } from '../model/DidYouKnow';

import { printInfo } from '../util/common';
import { cleanStorage, fromStorage, toStorage, uuid } from '../util/storage';
import { AppConfigService } from './app-config.service';

import { HttpService } from './http.service';
import { SecurityService } from './security.service';
import { SlideStaticManagerService } from './slide-static-manager.service';

@Injectable({
  providedIn: 'root',
})
export class DidYouNowService {
  // frecuencyShow: number = 2;
  constructor(
    public platform: Platform,
    private http: HttpService,
    private appConfigService: AppConfigService
  ) {}

  //FETCH EXCHANGE
  pendingDidYouNow: boolean = false;
  DidYouNowData: DidYouKnow[] = [];

  registerModule() {
    this.appConfigService.availableMods.next({
      ...this.appConfigService.availableMods.value,
      did_you_know: {
        loaded: true,
        items: this.DidYouNowData,
      },
    });
  }

  buildDidYouNow() {
    this.pendingDidYouNow = false;
    this.registerModule();
    toStorage('DIDYOUNOW', JSON.stringify(this.DidYouNowData));
  }

  getNextDidYouNowItem() {
    let next: DidYouKnow | any;
    if (this.DidYouNowData.filter((e) => !e.maskAsView).length === 0) {
      this.DidYouNowData = this.DidYouNowData.map((e) => ({
        ...e,
        maskAsView: false,
      }));
      toStorage('REPLACE-DIDYOUNOW', JSON.stringify(true));
    }
    if (this.DidYouNowData.filter((e) => !e.maskAsView).length > 0) {
      next = this.DidYouNowData.filter((e) => !e.maskAsView)[0];
      let index = this.DidYouNowData.findIndex((e) => e.uuid === next.uuid);
      this.DidYouNowData[index].maskAsView = true;
    }
    toStorage('DIDYOUNOW', JSON.stringify(this.DidYouNowData));
    return next;
  }
  fetchDidYouNow() {
    if (this.appConfigService.configsData?.modules?.did_you_know.enable)
      this.appConfigService.iniModules.push('Did you know');
    this.pendingDidYouNow = true;
    cleanStorage('REPLACE-DIDYOUNOW');
    this.http.call({ method: 'GET', path: '/did-you-knows' }).subscribe(
      (response) => {
        this.DidYouNowData = response.did_you_know.map((e:any) => ({
          ...e,
          uuid: uuid(),
          maskAsView: false,
        }));
        this.buildDidYouNow();
        this.appConfigService.iniModules =
          this.appConfigService.iniModules.filter((e) => e != 'Did you know');
      },
      (e) => {
        if (fromStorage('DIDYOUNOW')) {
          this.DidYouNowData = JSON.parse(fromStorage('DIDYOUNOW') as string);
          this.buildDidYouNow();
        }
      }
    );
  }
}
