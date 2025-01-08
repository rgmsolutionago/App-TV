import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ICallers } from 'src/app/model/ICallers';
import { DidYouKnow } from 'src/app/model/DidYouKnow';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DidYouNowService } from 'src/app/services/didYouNow.service';
import { TIME_PAUSE } from 'src/environments/environment';
import { AppConfigService } from 'src/app/services/app-config.service';
import { getModuleVideo } from 'src/app/util/common';

@Component({
  selector: 'didYouKnow-preview',
  templateUrl: './didYouKnow.component.html',
  styleUrls: ['./didYouKnow.component.scss'],
})
export class DidYouKnowComponent implements OnInit {
  @Input() widthContainer!: number;
  @Input() heightContainer!: number;
  @ViewChild('video') video!: ElementRef;

  endVideo: boolean = false;

  didYouKnow!: DidYouKnow | any;
  constructor(
    public dashboardService: DashboardService,
    public appConfigService: AppConfigService,

    public didYouKnowService: DidYouNowService
  ) {}

  ngOnInit() {
    this.didYouKnow = this.didYouKnowService.getNextDidYouNowItem();
   
    
  }

  ngAfterViewInit() {
    console.log(this.getVideo());
    console.log(this.didYouKnow);

    if (this.didYouKnow) {
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
      'didYouKnow',
      this.appConfigService.displayScreen.value === 2,
      this.dashboardService.callersData.length <= 1,
      this.didYouKnow?.question_and_answer?.category?.toLowerCase()
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

 
  getImage(category: any='environment') {
    return `url('../../../assets/module/didYouKnow/d/${category}/fondo.gif')`;
  }
  getImagePoster(category: string='environment') {
    return `./assets/module/didYouKnow/d/${category}/fondo.gif`;
  }
  getTopHeight() {
    return (this.heightContainer * 30) / 100 - 48;
  }
  getBottomHeight() {
    return (this.heightContainer * 70) / 100 - 48;
  }
}
