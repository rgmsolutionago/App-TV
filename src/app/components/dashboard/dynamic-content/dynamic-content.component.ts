import {
  afterNextRender,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SlideStaticManagerService } from 'src/app/services/slide-static-manager.service';
import { fromStorage } from 'src/app/util/storage';
import { INTERVAL_SLIDE } from 'src/environments/environment';
import { Swiper, SwiperOptions } from 'swiper/types';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'dynamic-content',
  templateUrl: './dynamic-content.component.html',
  styleUrls: ['./dynamic-content.component.scss'],
})
export class DynamicContentComponent implements OnInit {
  @Input() isPhone: boolean = false;
  @Input() heightContainer!: number;
  public swiperModule: any = [IonicSlides];

  public swiperParams!: SwiperOptions;

  public pagination: any = {
    el: '.swiper-pagination',
    type: 'bullets',
     
  };
  autoplay = {
    delay: INTERVAL_SLIDE,
  };

  loop = true;

  effect = 'fade';

  speed = 1000;

  fadeEffect: any = {
    crossFade: true,
  };

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  @Input() DISPLAY: number = 1;
  index: number = 0;
  slideOpts: any = {};
  constructor(
    public dashboardService: DashboardService,
    public slideStaticManagerService: SlideStaticManagerService,
    public appConfigService: AppConfigService
  ) {}

  ngOnInit() {
    this.appConfigService.displayScreen.subscribe((v) => {
      this.DISPLAY = v;
    });
  }
  r: any;

  swiperReady($event: any) {
    if (this.r) clearInterval(this.r);

    this.swiper = $event.detail[0];
    this.startProgress();
    this.r = setInterval(() => {
      this.swiper?.slideNext();
      this.startProgress();
    }, INTERVAL_SLIDE);
  }
  remain: number = 0;
  p: any;

  startProgress() {
    this.remain = 0;
    if (this.p) clearInterval(this.p);
    this.p = setInterval(() => {
      this.remain = this.remain + 1;
    }, INTERVAL_SLIDE / 100);
  }
}
