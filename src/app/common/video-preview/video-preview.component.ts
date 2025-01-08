import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Capacitor, WebView } from '@capacitor/core';
import { ReadFileResult } from '@capacitor/filesystem';
import { ICallers } from 'src/app/model/ICallers';
import { IContent } from 'src/app/model/IContent';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SlideStaticManagerService } from 'src/app/services/slide-static-manager.service';
import { TriviaService } from 'src/app/services/trivia.service';
import { TIME_PAUSE } from 'src/environments/environment';

@Component({
  selector: 'video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss'],
})
export class VideoPreviewComponent implements OnInit, OnDestroy {
  @Input() path!: string;
  item!: IContent;

  @ViewChild('video') video!: ElementRef;
  isNative: boolean = false;
  @Input() widthContainer!: number;
  @Input() heightContainer!: number;

  constructor(
    private slideStaticManagerService: SlideStaticManagerService,
    public dashboardService: DashboardService,
    public triviaService: TriviaService,
    public appConfigService: AppConfigService
  ) {
    this.isNative = this.slideStaticManagerService.isDevice();
  }
  ngOnDestroy(): void {
    this.video.nativeElement.pause();
    this.video.nativeElement.removeAttribute('src'); // empty source
    this.video.nativeElement.load();
  }

  classTag = '';
  hasPlayed: boolean = true;
  ngOnInit(): void {
    this.item = this.dashboardService.getNextContentItem();

    this.appConfigService.displayScreen.subscribe((v) => {
      if (this.appConfigService.display === 'CONTENT') {
        if (v === 0 || v === 1) this.classTag = `h-[calc(100vh_-_30px)]`;
        if (v === 2 || v === 3) this.classTag = `h-[calc(100vw_-_30px)]`;
      }
      if (this.appConfigService.display === 'SLIDE_NEWS') {
        if (v === 0 || v === 1) this.classTag = `h-[calc(66vh_-_30px)]`;
        if (v === 2 || v === 3) this.classTag = `h-[calc(66vw_-_30px)]`;
      }
    });
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

  reDownloadIfNotExist() {
    this.slideStaticManagerService.registredMediaStatus(
      this.item.name,
      true,
      false,
      this.item.ext,
      this.item.poster
    );

    this.slideStaticManagerService
      .downloadMediaResource(this.item)
      .then((r) => {
        this.slideStaticManagerService.registredMediaStatus(
          this.item.name,
          true,
          true,
          this.item.ext,
          this.item.poster
        );
        this.item.downloading = false;
      })
      .catch((e) => {
        this.slideStaticManagerService.registredMediaStatus(
          this.item.name,
          false,
          false,
          this.item.ext,
          this.item.poster
        );
      });
  }

  ngAfterViewInit() {
    if (!this.item.base64 || this.item.source === 'image') {
      setTimeout(() => {
        this.nextSlide();
      }, 120);
    } else {
      this.inicializeVideo(this.item.base64);
    }
  }

  nextSlide() {
    this.dashboardService.nextContent();
  }

  inicializeVideo(src = '') {
    this.video.nativeElement.src = src;
    this.video.nativeElement.setAttribute('crossorigin', 'anonymous');
    this.video.nativeElement.crossOrigin = 'anonymous';
    this.video.nativeElement.load();
    this.play();
    this.video.nativeElement.addEventListener(
      'ended',
      () => {
        this.nextSlide();
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
    this.video.nativeElement.play();
  }

  truncate(v: string) {
    return v ? v.substring(0, 60) : 'No poster';
  }
}
