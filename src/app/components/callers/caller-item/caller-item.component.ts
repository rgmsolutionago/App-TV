import { Component, Input, OnInit } from '@angular/core';
import { ICallers } from 'src/app/model/ICallers';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FirebaseService } from 'src/app/services/firestore.service';

@Component({
  selector: 'caller-item',
  templateUrl: './caller-item.component.html',
  styleUrls: ['./caller-item.component.scss'],
})
export class CallerItemComponent implements OnInit {
  @Input() item!: ICallers;

  @Input() padding!: number;
  @Input() DISPLAY!: number;

  secondary: string = '';
  height: string = ``;
  constructor(
    public dashboardService: DashboardService,
    public appConfigService: AppConfigService,
    public firebaseService: FirebaseService
  ) {}
  ngOnInit() {
    if (this.DISPLAY === 2 || this.DISPLAY === 4) this.height = `calc(20vw - ${this.padding}px)`;
    else this.height = `calc(30vh - ${this.padding}px)`;
    if (this.item.primary_color === '#FFAA71') this.secondary = '#EC8641';
    if (this.item.primary_color === '#FF6C86') this.secondary = '#FA3659';
    if (this.item.primary_color === '#3DA4FE') this.secondary = '#198EF3';

    this.firebaseService.fetchEmission(
      this.appConfigService.configsData.uuid,
      (data: any) => {
        if (this.item.name === 'Equipo A') {
          this.item.number = data?.sportData?.teamAScore ?? 0;
        } 
        
        if (this.item.name === 'Equipo B') {
          this.item.number = data?.sportData?.teamBScore ?? 0;
        } 
      }
    );
  }
}
