import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IReview } from '../model/IReview';
import { cleanStorage, fromStorage, toStorage, uuid } from '../util/storage';
import { AppConfigService } from './app-config.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  // frecuencyShow: number = 2;
  constructor(
    public platform: Platform,
    private appConfigService: AppConfigService,
    private http: HttpService
  ) {}

  //FETCH EXCHANGE
  pendingReview: boolean = false;
  reviewData: IReview[] = [];

  qr: string = '';
  rating: number = 0;
  total: number = 0;

  registerModule() {
    this.appConfigService.availableMods.next({
      ...this.appConfigService.availableMods.value,
      review: {
        loaded: true,
        items: this.reviewData,
      },
    });
  }

  buildReview() {
    this.pendingReview = false;
    this.registerModule();
    toStorage('REVIEW', JSON.stringify(this.reviewData));
  }

  getNextReviewItem() {
    let next: IReview| any;
    if (this.reviewData.filter((e) => !e.maskAsView).length === 0) {
      this.reviewData = this.reviewData.map((e) => ({
        ...e,
        maskAsView: false,
      }));
      toStorage('REPLACE-REVIEW', JSON.stringify(true));
    }

    if (this.reviewData.filter((e) => !e.maskAsView).length > 0) {
      next = this.reviewData.filter((e) => !e.maskAsView)[0];
      let index = this.reviewData.findIndex((e) => e.uuid === next.uuid);
      this.reviewData[index].maskAsView = true;
    }
    toStorage('REVIEW', JSON.stringify(this.reviewData));

    return next;
  }
  fetchReview() {
    if (this.appConfigService.configsData?.modules?.review?.enable)
      this.appConfigService.iniModules.push('reviews');
    
      this.pendingReview = true;
    cleanStorage('REPLACE-REVIEW');
    this.http.call({ method: 'GET', path: '/reviews' }).subscribe(
      (response) => {
        this.qr = response.data.qr;
        this.total = response.data.total;
        this.rating = response.data.rating;
        this.reviewData = response.data.reviews.map((e:any) => ({
          ...e,
          uuid: uuid(),
          maskAsView: false,
        }));
        this.buildReview();
        this.appConfigService.iniModules =
          this.appConfigService.iniModules.filter((e) => e != 'reviews');
      },
      (e) => {
        if (fromStorage('REVIEW')) {
          this.reviewData = JSON.parse(fromStorage('REVIEW') as string);
          this.buildReview();
        }
      }
    );
  }
}
