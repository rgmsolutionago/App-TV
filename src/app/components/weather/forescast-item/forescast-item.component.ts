import { Component, Input, OnInit } from '@angular/core';
import { IForecast } from 'src/app/model/IForecast';

@Component({
  selector: 'forescast-item',
  templateUrl: './forescast-item.component.html',
  styleUrls: ['./forescast-item.component.scss'],
})
export class ForescastItemComponent implements OnInit {
  @Input() item!: IForecast | any;
  @Input() index!: number;
  icon: number = 113;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.getIcon(this.item.code);
    }, 100);
  }
  getUVBackground(): any {
    if (this.item?.uv >= 3 && this.item?.uv <= 5) return 'bg-brand-yellow';
    if (this.item?.uv >= 6 && this.item?.uv <= 7) return 'bg-brand-yellow2';
    if (this.item?.uv >= 8 && this.item?.uv <= 10) return 'bg-brand-red-100';
    if (this.item?.uv >= 11) return 'bg-brand-purple';
  }

  getHuricateBackground(): any {
    if (this.item?.alert.level === 2) return 'bg-brand-yellow';
    if (this.item?.alert.level === 3) return 'bg-brand-yellow2';
    if (this.item?.alert.level === 4) return 'bg-brand-red-100';
  }
  getIcon(code: number = 200): any {
    switch (code) {
      case 113:
        this.icon = 113;
        break;
      case 119:
      case 122:
      case 143:
        this.icon = 116;
        break;
      case 176:
      case 179:
      case 182:
      case 293:
      case 299:
      case 305:
      case 323:
      case 329:
      case 353:
      case 356:
      case 359:
        this.icon = 176;
        break;
      case 227:
      case 230:
      case 248:
      case 260:
      case 317:
      case 320:
      case 326:
      case 332:
      case 335:
      case 338:
      case 350:
      case 362:
      case 365:
      case 368:
      case 371:
      case 374:
      case 377:
        this.icon = 227;
        break;

      case 185:
      case 263:
      case 266:
      case 281:
      case 284:
      case 296:
      case 302:
      case 308:
      case 311:
      case 314:
        this.icon = 253;
        break;
      case 200:
      case 386:
      case 389:
      case 392:
      case 395:
        this.icon = 200;
        break;

      default:
        this.icon = 113;
        break;
    }
  }
}
