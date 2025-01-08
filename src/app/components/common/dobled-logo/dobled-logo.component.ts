import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'dobled-logo',
  templateUrl: './dobled-logo.component.html',
  styleUrls: ['./dobled-logo.component.scss'],
})
export class DobledLogoComponent implements OnInit {

  constructor(public appConfigService:AppConfigService) { }

  ngOnInit() {}

}
