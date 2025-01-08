import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SlideStaticManagerService } from 'src/app/services/slide-static-manager.service';

@Component({
  selector: 'dobled-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {

  constructor(
    public slideStaticManagerService: SlideStaticManagerService,
    public appConfigService: AppConfigService,
    public dashboardService: DashboardService
  ) { }

  ngOnInit() {}

}
