import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'wheater-icon-113',
  template: `
    <div class="weather-icon weather-icon-1" [style.width]="width">
      <!-- shortcode: wi1 -->
      <svg viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g class="wi1-rays">
          <path [attr.stroke]="thirdColor" d="M105.5 55L95.5 55" />
          <path
            [attr.stroke]="thirdColor"
            d="M91.5319 89.4043L84.0106 82.1064"
          />
          <path [attr.stroke]="thirdColor" d="M55.5 104V94" />
          <path
            [attr.stroke]="thirdColor"
            d="M18.4681 90.4468L27.0638 83.1489"
          />
          <path [attr.stroke]="thirdColor" d="M4.5 55H16.5" />
          <path
            [attr.stroke]="thirdColor"
            d="M19.5426 19.5532L27.0638 27.8936"
          />
          <path [attr.stroke]="thirdColor" d="M56.5 6V16" />
          <path [attr.stroke]="thirdColor" d="M91.5 21L84.5 28" />
        </g>
        <path
          class="wi1-circle"
          [attr.stroke]="primaryColor"
          d="M79 55.5C79 68.157 68.5247 78.5 55.5 78.5C42.4753 78.5 32 68.157 32 55.5C32 42.843 42.4753 32.5 55.5 32.5C68.5247 32.5 79 42.843 79 55.5Z"
        />
      </svg>
    </div>
  `,
  styles: [    `
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
export class Icon113Component implements OnInit {
  @Input() primaryColor: string = '#a0c51e';
  @Input() thirdColor: string = '#a0c51e';
  @Input() width: string = '100px';

  ngOnInit(): void {}
}
