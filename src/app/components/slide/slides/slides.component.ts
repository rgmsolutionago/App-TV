import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SlideStaticManagerService } from 'src/app/services/slide-static-manager.service';

@Component({
  selector: 'dobled-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit, OnDestroy {
  classSlide: string = '';
  @Input() DISPLAY: number = 0;

  constructor(
    public dashboardService: DashboardService,
    public appConfigService: AppConfigService,
    public slideStaticManagerService: SlideStaticManagerService
  ) {}
  ngOnDestroy(): void {}

  ngOnInit() {
    
    this.appConfigService.reelIsReadyToGo.subscribe((reelIsReadyToGo) => {
      if (reelIsReadyToGo) this.dashboardService.startContent();
    });
     
  }
}
