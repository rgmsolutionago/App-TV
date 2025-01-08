import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { ITrivia } from '../model/ITrivia';
import { printInfo } from '../util/common';
import { cleanStorage, fromStorage, toStorage } from '../util/storage';
import { AppConfigService } from './app-config.service';

import { HttpService } from './http.service';
import { SecurityService } from './security.service';
import { SlideStaticManagerService } from './slide-static-manager.service';

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  // frecuencyShow: number = 2;

  constructor(
    public platform: Platform,
    private http: HttpService,
    private appConfigService: AppConfigService
  ) {}

  //FETCH EXCHANGE
  pendingTrivia: boolean = false;
  triviaData: ITrivia[] = [];

  registerModule() {
    this.appConfigService.availableMods.next({
      ...this.appConfigService.availableMods.value,
      trivia: {
        loaded: true,
        items: this.triviaData,
      },
    });
  }

  buildTrivia() {
    this.registerModule();
    this.pendingTrivia = false;
    toStorage('TRIVIA', JSON.stringify(this.triviaData));
  }

  getNextTriviaItem() {
    let next: ITrivia | any;
    if (this.triviaData.filter((e) => !e.maskAsView).length === 0) {
      this.triviaData = this.triviaData.map((e) => ({
        ...e,
        maskAsView: false,
      }));
      toStorage('REPLACE', JSON.stringify(true));
    }

    if (this.triviaData.filter((e) => !e.maskAsView).length > 0) {
      next = this.triviaData.filter((e) => !e.maskAsView)[0];
      let index = this.triviaData.findIndex((e) => e.uuid === next.uuid);
      this.triviaData[index].maskAsView = true;
    }
    toStorage('TRIVIA', JSON.stringify(this.triviaData));

    return next;
  }
  fetchTrivia() {
    if (this.appConfigService.configsData?.modules?.trivia.enable)
      this.appConfigService.iniModules.push('Trivia');

    this.pendingTrivia = true;
    cleanStorage('REPLACE');
    this.http.call({ method: 'GET', path: '/trivias' }).subscribe(
      (response) => {
        this.triviaData = response.trivias.map((e:any) => ({
          ...e,
          maskAsView: false,
        }));
        this.buildTrivia();
        this.appConfigService.iniModules =
          this.appConfigService.iniModules.filter((e) => e != 'Trivia');
      },
      (e) => {
        if (fromStorage('TRIVIA')) {
          this.triviaData = JSON.parse(fromStorage('TRIVIA') as string);
          this.buildTrivia();
        }
      }
    );
  }
}
