import { Component, Input, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
@Component({
  selector: 'wheater-icon-selector',
  template: `
    <div>
      <wheater-icon-113
        [primaryColor]="primaryColor"
        [width]="width"
        [thirdColor]="thirdColor"
        *ngIf="code == 113"
      ></wheater-icon-113>
      <wheater-icon-116
        [primaryColor]="primaryColor"
        [width]="width"
        [thirdColor]="thirdColor"
        *ngIf="code == 116"
      ></wheater-icon-116>
      <wheater-icon-176
        [primaryColor]="primaryColor"
        [width]="width"
        [thirdColor]="thirdColor"
        *ngIf="code == 176"
      ></wheater-icon-176>
      <wheater-icon-200
        [primaryColor]="primaryColor"
        [width]="width"
        [thirdColor]="thirdColor"
        *ngIf="code == 200"
      ></wheater-icon-200>
      <wheater-icon-227
        [primaryColor]="primaryColor"
        [width]="width"
        [thirdColor]="thirdColor"
        *ngIf="code == 227"
      ></wheater-icon-227>
      <wheater-icon-253
        [primaryColor]="primaryColor"
        [width]="width"
        [thirdColor]="thirdColor"
        *ngIf="code == 253"
      ></wheater-icon-253>
    </div>
  `,
  styles: [
    `
      .weather-icon {
      }
      .weather-icon svg {
        width: 100%;
      }
      .weather-icon .wi1-circle {
        stroke-width: 5;
      }
      .weather-icon .wi1-rays path {
        stroke-width: 5.72932;
        stroke-miterlimit: 10;
        stroke-linecap: round;
      }
      .weather-icon .wi1-rays {
        animation: wi1-rotate-rays 10s infinite linear;
        transform-origin: 50% 50%;
      }
      @keyframes wi1-rotate-rays {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }
    `,
  ],
})
export class IconSelecterComponent implements OnInit {
  @Input() primaryColor: string = '#a0c51e';
  @Input() thirdColor: string = '#a0c51e';

 
  @Input() width: string = '100px';
  @Input() code!: number;

  ngOnInit(): void {}
}
