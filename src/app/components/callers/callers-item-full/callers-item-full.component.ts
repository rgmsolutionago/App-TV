import { Component, Input, OnInit } from '@angular/core';
import { ICallers } from 'src/app/model/ICallers';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'callers-item-full',
  templateUrl: './callers-item-full.component.html',
  styleUrls: ['./callers-item-full.component.scss'],
})
export class CallersItemFullComponent implements OnInit {
  constructor(public dashboardService: DashboardService) {}
  ngOnInit() {}
}
