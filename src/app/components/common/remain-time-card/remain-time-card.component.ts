import { Component, Input, OnInit } from '@angular/core';
import { IScore } from 'src/app/model/IScore';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FirebaseService } from 'src/app/services/firestore.service';

@Component({
  selector: 'remain-time-card',
  templateUrl: './remain-time-card.component.html',
  styleUrls: ['./remain-time-card.component.scss'],
})
export class RemainTimeCardComponent implements OnInit {
  @Input() padding!: number;
  @Input() DISPLAY!: number;
  height: string = ``;

  time: number = 0;
  constructor(
    public appConfigService: AppConfigService,
    public dashboardService: DashboardService,
    public firebaseService: FirebaseService
  ) {}
  ngOnInit() {
    if (this.DISPLAY === 2 || this.DISPLAY === 4)
      this.height = `calc(20vw - ${this.padding}px)`;
    else this.height = `calc(40vh - ${this.padding}px)`;

    this.firebaseService.fetchEmission(
      this.appConfigService.configsData.uuid,
      (data: any) => {
        this.time = data?.sportData?.remainTime ?? 0;
        this.startCountDown();
      }
    );
  }

  resource: any;
  startCountDown() {
    if (this.resource) clearInterval(this.resource);

    this.resource = setInterval(() => {
      this.time = this.time - 1;
      if (this.time <= 0) {
        this.time = 0;
      }

      this.firebaseService.updateEmissionSportData(
        this.appConfigService.configsData.uuid,
        {
          remainTime: this.time,
        }
      );
    }, 60000);
  }
}
