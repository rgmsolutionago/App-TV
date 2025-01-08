import { Component, Input, OnInit } from '@angular/core';
import { ISport } from 'src/app/model/ISport';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'sport-item',
  templateUrl: './sport-item.component.html',
  styleUrls: ['./sport-item.component.scss'],
})
export class SportItemComponent implements OnInit {
  @Input() item!: ISport | any;
  constructor(public appConfigService: AppConfigService) {}
  @Input() DISPLAY!: number;
  ngOnInit() {}

  getTime(minute: string) {
    if (minute) {
      if (minute === 'Finished' || minute === 'Finalizado') return 'Finalizado';
      else if (minute === 'Half Time' || minute === 'Descanso') return 'Descanso';
      return minute + "'";
    } else {
      return '';
    }
  }

  showLoading(minute: string) {
    if (minute) {
      if (minute === 'Finished' || minute === 'Finalizado') return false;
      else if (minute === 'Half Time' || minute === 'Descanso')   return true;
      return true;
    } else {
      return false;
    }
  }
}
