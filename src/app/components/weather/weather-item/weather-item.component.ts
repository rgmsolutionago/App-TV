import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import * as moment from 'moment';

import { IWeather } from 'src/app/model/IWeather';
import { AppConfigService } from 'src/app/services/app-config.service';
import { getIconCode } from 'src/app/util/common';

@Component({
  selector: 'weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss'],
})
export class WeatherItemComponent implements OnInit {
  @Input() item!: IWeather | any;
  @Input() DISPLAY: number = 0;
  @Input() index!: number;

  code!: number;
  constructor(
    private ngZone: NgZone,
    public appConfigService: AppConfigService
  ) {}

  widthIcon: number = 120;
  heightIcon: number = 120;
  mt: string = '-mt-8';
  ngOnInit() {
    this.code = getIconCode(this.item?.code);

    /*
    this.item.alert.level=1
    this.item.alert.type='rain'
    this.item.alert.info='Vientos Fuertes y persistentes'
    this.item.isToday=true
    */
  }

  getUVBackground(): any {
    if (this.item?.uv >= 3 && this.item?.uv <= 5) return 'bg-brand-yellow';
    if (this.item?.uv >= 6 && this.item?.uv <= 7) return 'bg-brand-yellow2';
    if (this.item?.uv >= 8 && this.item?.uv <= 10) return 'bg-brand-red-100';
    if (this.item?.uv >= 11) return 'bg-brand-purple';
  }

  getUVText(): any {
    if (this.item?.uv >= 3 && this.item?.uv <= 5) return 'UV Riesgo Moderado';
    if (this.item?.uv >= 6 && this.item?.uv <= 7) return 'UV Riesgo Alto';
    if (this.item?.uv >= 8 && this.item?.uv <= 10) return 'UV Riesgo Muy Alto';
    if (this.item?.uv >= 11) return 'UV Riesgo Extremo';
  }

  getHuricateBackground() {
    if (this.item.isToday) {
      if (this.item?.alert?.level === 2) return 'bg-brand-yellow';
      if (this.item?.alert?.level === 3) return 'bg-brand-yellow2';
      if (this.item?.alert?.level === 4) return 'bg-brand-red-100';
    }
    return '';
  }

  getTime(e: any) {
    return moment(e).format('d a');
  }
}
