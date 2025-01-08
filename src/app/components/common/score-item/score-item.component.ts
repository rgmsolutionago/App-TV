import { Component, Input, OnInit } from '@angular/core';
import { IScore } from 'src/app/model/IScore';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FirebaseService } from 'src/app/services/firestore.service';

@Component({
  selector: 'score-item',
  templateUrl: './score-item.component.html',
  styleUrls: ['./score-item.component.scss'],
})
export class ScoreItemComponent implements OnInit {
  secondary: string = '';
  height: string = ``;

  scoreSetA: number = 0;
  scoreSetB: number = 0;

  scoreGameA: number = 0;
  scoreGameB: number = 0;
  constructor(
    public appConfigService: AppConfigService,
    public firebaseService: FirebaseService
  ) {}
  ngOnInit() {
    this.firebaseService.fetchEmission(
      this.appConfigService.configsData.uuid,
      (data: any) => {
        this.scoreSetA = data?.sportData?.teamASetScore ?? 0;
        this.scoreSetB = data?.sportData?.teamBSetScore ?? 0;

        this.scoreGameA = data?.sportData?.teamAGameScore ?? 0;
        this.scoreGameB = data?.sportData?.teamBGameScore ?? 0;
      }
    );
  }
}
