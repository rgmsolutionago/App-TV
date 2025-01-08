import { Component, Input, OnInit } from '@angular/core';
import { IScore } from 'src/app/model/IScore';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FirebaseService } from 'src/app/services/firestore.service';

@Component({
  selector: 'date-card',
  templateUrl: './date-card.component.html',
  styleUrls: ['./date-card.component.scss'],
})
export class DateCardComponent implements OnInit {
  @Input() padding!: number;
  @Input() DISPLAY!: number;
  height: string = ``;
  constructor(
    public appConfigService: AppConfigService,
    public dashboardService: DashboardService,
    public firebaseService: FirebaseService
  ) {}
  ngOnInit() {
    if (this.DISPLAY === 2 || this.DISPLAY === 4)
      this.height = `calc(20vw - ${this.padding}px)`;
    else this.height = `calc(30vh - ${this.padding}px)`;
  }
}
