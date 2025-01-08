import { Component, Input, OnInit } from '@angular/core';
import { IRate } from 'src/app/model/IRate';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'rates-item',
  templateUrl: './rates-item.component.html',
  styleUrls: ['./rates-item.component.scss'],
})
export class RatesItemComponent implements OnInit {
  updateAt: string = new Date().toISOString();
  constructor(public dashboardService: DashboardService,public appConfigService: AppConfigService) {}
  @Input() DISPLAY!: number;
  ngOnInit() {
    if (this.dashboardService.exchangeData.length > 0)
      this.updateAt = this.dashboardService.exchangeData[0].updated_at;
  }

  getFlag(name: string): any {
    switch (name) {
      case 'Dólar':
        return './assets/usa.png';
      case 'Euro':
        return './assets/europe.png';
      case 'P. Argentino':
        return './assets/arg.png';
      case 'Real':
        return './assets/brasil.png';
    }
  }
}
