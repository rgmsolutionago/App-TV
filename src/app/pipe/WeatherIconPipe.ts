import { Pipe, PipeTransform } from '@angular/core';
import { IWeather } from '../model/IWeather';

@Pipe({ name: 'weatherIcon' })
export class WeatherIconPipe implements PipeTransform {
  transform(code: number) {
    switch (code) {
      case 113:
        return 113;
      case 119:
      case 122:
      case 143:
        return 116;
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
        return 176;
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
        return 227;

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
        return 253;

      case 200:
      case 386:
      case 389:
      case 392:
      case 395:
        return 200;

      default:
        return 113;
        break;
    }
  }
}
