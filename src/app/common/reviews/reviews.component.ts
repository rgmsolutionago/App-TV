import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ICallers } from 'src/app/model/ICallers';
import { IReview } from 'src/app/model/IReview';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ReviewService } from 'src/app/services/review.service';
import { TIME_PAUSE } from 'src/environments/environment';
import * as _ from 'lodash';
import { getModuleVideo } from 'src/app/util/common';

@Component({
  selector: 'review-preview',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  @Input() widthContainer !: number;
  @Input() heightContainer !: number;
  @ViewChild('video') video!: ElementRef;
  endVideo: boolean = false;

  review!: IReview| any;
  constructor(
    public dashboardService: DashboardService,
    public reviewService: ReviewService,
    public appConfigService: AppConfigService
  ) {}

  ngOnInit() {
    this.review = this.reviewService.getNextReviewItem();
  }

  ngAfterViewInit() {
    if (this.review) {
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
      'review',
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
    return `url('../../../assets/module/review/cine_tv_pop.gif')`;
  }

  getCount() {
    return Array(this.review.rating)
      .fill(1)
      .concat(Array(5 - this.review.rating).fill(0));
  }

  getCountTotal() {
    return Array(Math.floor(this.reviewService.rating))
      .fill(1)
      .concat(Array(5 - Math.floor(this.reviewService.rating)).fill(0));
  }

  truncate() {
    return _.truncate(this.review.text, {
      length: 110,
      omission: '...',
    });
  }
}
