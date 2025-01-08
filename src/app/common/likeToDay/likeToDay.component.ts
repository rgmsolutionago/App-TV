import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ICallers } from 'src/app/model/ICallers';
import { ISlideType } from 'src/app/model/IConfig';
import { IlikeToDay } from 'src/app/model/IlikeToDay';
import { ITrivia } from 'src/app/model/ITrivia';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LikeToDayService } from 'src/app/services/likeToDay.service';
import { TriviaService } from 'src/app/services/trivia.service';
import { getModuleVideo } from 'src/app/util/common';
import { TIME_PAUSE } from 'src/environments/environment';

@Component({
  selector: 'likeToDay-preview',
  templateUrl: './likeToDay.component.html',
  styleUrls: ['./likeToDay.component.scss'],
})
export class LikeToDayComponent implements OnInit {
  @Input() widthContainer!: number;
  @Input() heightContainer!: number;
  @ViewChild('video') video!: ElementRef;

  endVideo: boolean = false;
 
  likeToDay!: IlikeToDay | any;
  constructor(
    public dashboardService: DashboardService,
    public likeToDayService: LikeToDayService,
    public appConfigService: AppConfigService,

  ) {}

  ngOnInit() {
    this.likeToDay = this.likeToDayService.getNextLikeToDayItem(); 
  }

  ngAfterViewInit() {
    if (this.likeToDay) {
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
      'liketoDay',
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
    return `url('../../../assets/module/liketoDay/un_dia_como_hoy_fondo_animado.gif')`;
  }
}
