import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ReadFileResult } from '@capacitor/filesystem';
import { ICallers } from 'src/app/model/ICallers';
import { ISlideType } from 'src/app/model/IConfig';
import { IContent } from 'src/app/model/IContent';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SlideStaticManagerService } from 'src/app/services/slide-static-manager.service';
import { TriviaService } from 'src/app/services/trivia.service';
import { NOCONTENT_SHOW_COUNT } from 'src/environments/environment';

@Component({
  selector: 'image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
})
export class ImagePreviewComponent implements OnInit {
  @Input() slideIndex!: number;
  item!: IContent;
  interval: any;
  @Input() widthContainer!: number;
  @Input() heightContainer!: number;

  image: string = '';
  isNative: boolean = false;
  intervalTime!: number;
  constructor(
    private slideStaticManagerService: SlideStaticManagerService,
    public dashboardService: DashboardService,
    public triviaService: TriviaService,
    public appConfigService: AppConfigService
  ) {
    this.isNative = this.slideStaticManagerService.isDevice();
  }

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
      this.handleNextAction();
    }
  }

  handleNextAction() {
    if (this.interval) clearTimeout(this.interval);
    this.intervalTime = this.item.time === 0 ? 10000 : this.item.time * 1000;
    console.log(this.intervalTime);
    
    this.interval = setTimeout(() => {
      this.nextSlide();    
      clearTimeout(this.interval);
    }, this.intervalTime);
  }

  nextSlide() {
    this.dashboardService.nextContent();
  }

  classTag = '';
  async ngOnInit(): Promise<void> {
    this.item = this.dashboardService.getNextContentItem();
    if (!this.item.url) {
      setTimeout(() => {
        this.nextSlide();
      }, 1000);
    } else {
      if (this.item.base64) this.image = this.item.base64;
      else this.image = this.item.url;
    }

    if (this.appConfigService.display === 'CONTENT')
      this.appConfigService.displayScreen.subscribe((v) => {
        if (v === 0 || v === 1) this.classTag = `h-[calc(100vh_-_30px)]`;
        if (v === 2 || v === 3) this.classTag = `h-[calc(100vw_-_30px)]`;
      });

    this.handleNextAction();
  }
}
