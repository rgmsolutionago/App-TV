import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'slide-item',
  templateUrl: './slide-item.component.html',
  styleUrls: ['./slide-item.component.scss'],
})
export class SlideItemComponent implements OnInit { 
  @Input() widthContainer!: number;
  @Input() heightContainer!: number;
  @Input() DISPLAY: number = 0;

  constructor(public dashboardService: DashboardService,
    public triviaService: TriviaService
    ) {}

  ngOnInit() {}
}
