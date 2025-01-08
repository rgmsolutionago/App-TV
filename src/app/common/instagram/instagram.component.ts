import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ICallers } from 'src/app/model/ICallers';
import { IInstagram } from 'src/app/model/IInstagram';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { InstagramService } from 'src/app/services/instagram.service';
import { getModuleVideo, registerLog } from 'src/app/util/common';
import { TIME_PAUSE } from 'src/environments/environment';

@Component({
  selector: 'instagram-preview',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss'],
})
export class InstagramComponent implements OnInit {
  @Input() widthContainer!: number;
  @Input() heightContainer!: number;
  @ViewChild('video') video!: ElementRef;

  countAnimation = new Array(59).fill(0);
  postWithVideo: boolean = true;
  instagramInfo!: IInstagram;
  constructor(
    public dashboardService: DashboardService,
    public instagramService: InstagramService,
    public appConfigService: AppConfigService
  ) {}

  getImage() {
    return `url('${this.instagramInfo.thumbnail_url}')`;
  }

  getImageUri() {
    return this.instagramInfo.thumbnail_url;
  }

 

  ngOnInit() {
    this.instagramInfo = this.instagramService.getNextInstagramItem();    
  }

  
  ngAfterViewInit() {
    console.log(this.instagramInfo);    
    if (this.instagramInfo) {
      if (this.instagramInfo.video_url) {
        this.postWithVideo = true;
        //this.inicializeVideo(this.getVideo());
        if (!this.instagramInfo.base64) {
          setTimeout(() => {
            this.nextSlide();
          }, 120);
        } else {
          this.inicializeVideo(this.instagramInfo.base64);
        }


      } else {
        this.postWithVideo = false;
        setTimeout(() => {
          this.nextSlide();
        }, this.instagramInfo.time_to_air * 1000);
      }
    } else {
      this.nextSlide();
    }
  }

  nextSlide() {
   this.dashboardService.nextContent();
  }

  getVideo() {
    return this.instagramInfo.video_url;   
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
     
    if (this.video) {
      this.video.nativeElement.src = src;
      this.video.nativeElement.load();
      console.log(this.video.nativeElement);
      
      this.play();
      this.video.nativeElement.addEventListener(
        'ended',
        () => {
         
          this.nextSlide();
        },
        false
      );
    }
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
    try {
      this.video.nativeElement
        .play()
        .then((r: any) => {})
        .catch((e: any) => {
          this.nextSlide();
        });
    } catch (error) {
      registerLog(JSON.stringify(error));
      this.nextSlide();
    }
  }




  
}
