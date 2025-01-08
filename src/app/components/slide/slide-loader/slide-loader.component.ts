import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SlideStaticManagerService } from 'src/app/services/slide-static-manager.service';

@Component({
  selector: 'slide-loader',
  templateUrl: './slide-loader.component.html',
  styleUrls: ['./slide-loader.component.scss'],
})
export class SlideLoaderComponent implements OnInit {
  @Input() widthContainer!: number;
  @Input() heightContainer!: number;

  @ViewChild('video') video!: ElementRef;

  constructor(
    public dashboardService: DashboardService,
    public slideStaticManagerService: SlideStaticManagerService,
    public appConfigService: AppConfigService
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.video.nativeElement.pause();
    this.video.nativeElement.removeAttribute('src'); // empty source
    this.video.nativeElement.load();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.appConfigService.endPreload.next(true);
    },  12*1000);
    //this.inicializeVideo('./assets/loader/dobled_1920x1080.webm');
  }

  inicializeVideo(src = '') {
    this.video.nativeElement.src = src;
    this.video.nativeElement.loop = true;
    this.video.nativeElement.setAttribute('crossorigin', 'anonymous');
    this.video.nativeElement.crossOrigin = 'anonymous';
    this.video.nativeElement.load();
    this.play();
  }

  pause() {
    this.video.nativeElement.pause();
  }
  play(reset: boolean = true) {
    
    
    this.video.nativeElement.play().then(() => {
      setTimeout(() => {
        this.appConfigService.endPreload.next(true);
      },  this.video.nativeElement.duration*1000);
      
    }).catch((e:any)=>{
        console.log(e);
        
    });
  }

  modulesIndex() {
    return this.appConfigService.iniModules.filter(
      (item, index) => this.appConfigService.iniModules.indexOf(item) === index
    );
  }
}
