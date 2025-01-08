import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'wheater-icon-200',
  template: `
    <div class="weather-icon weather-icon-6" [style.width]="width">
      <!-- shortcode: wi6 -->
      <svg viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g class="wi6-light">
          <line [attr.stroke]="thirdColor" x1="64" y1="55" x2="59" y2="72" />
          <line [attr.stroke]="thirdColor" x1="59" y1="72" x2="70" y2="72" />
          <line [attr.stroke]="thirdColor" x1="70" y1="72" x2="65" y2="89" />
        </g>
        <path
          [attr.fill]="primaryColor"
          class="wi6-cloud"
          d="M41.6702 71.8081C41.6702 71.2483 41.4478 70.7114 41.0519 70.3155C40.656 69.9196 40.1191 69.6972 39.5593 69.6972C37.4718 69.6972 35.4311 69.0782 33.6954 67.9184C31.9597 66.7587 30.607 65.1103 29.8081 63.1817C29.0093 61.2531 28.8002 59.1309 29.2075 57.0835C29.6147 55.0361 30.62 53.1554 32.0961 51.6793C33.5722 50.2032 35.4528 49.198 37.5002 48.7908C39.5476 48.3835 41.6698 48.5925 43.5984 49.3914C45.527 50.1902 47.1754 51.5431 48.3352 53.2788C49.4949 55.0145 50.1139 57.0551 50.1139 59.1426C50.1139 59.7024 50.3364 60.2394 50.7322 60.6352C51.1281 61.0311 51.665 61.2535 52.2249 61.2535C52.7847 61.2535 53.3216 61.0311 53.7175 60.6352C54.1133 60.2394 54.3358 59.7024 54.3358 59.1426C54.3303 55.6116 53.0607 52.1994 50.7567 49.5237C48.4527 46.848 45.2668 45.0857 41.7757 44.5561C42.2868 39.7243 44.6297 35.2719 48.3227 32.1144C52.0157 28.957 56.7781 27.3345 61.6306 27.5805C66.4831 27.8265 71.057 29.9223 74.4117 33.4371C77.7665 36.9518 79.6471 41.6183 79.6669 46.477C79.6669 47.0369 79.8893 47.5738 80.2852 47.9697C80.6811 48.3656 81.218 48.588 81.7778 48.588H90.2215C93.0208 48.588 95.7054 49.7 97.6847 51.6793C99.6641 53.6587 100.776 56.3433 100.776 59.1426C100.776 61.9418 99.6641 64.6265 97.6847 66.6058C95.7054 68.5852 93.0208 69.6972 90.2215 69.6972C89.6617 69.6972 89.1248 69.9196 88.7289 70.3155C88.333 70.7114 88.1106 71.2483 88.1106 71.8081C88.1106 72.368 88.333 72.9049 88.7289 73.3008C89.1248 73.6967 89.6617 73.9191 90.2215 73.9191C94.1405 73.9191 97.8989 72.3623 100.67 69.5911C103.441 66.82 104.998 63.0616 104.998 59.1426C104.998 55.2236 103.441 51.4652 100.67 48.694C97.8989 45.9229 94.1405 44.3661 90.2215 44.3661H83.8887C83.3206 38.6184 80.6308 33.2887 76.3443 29.4175C72.0579 25.5464 66.4827 23.4117 60.7069 23.4301C54.9312 23.4486 49.3697 25.6189 45.1081 29.5174C40.8466 33.4159 38.1909 38.7627 37.6595 44.5139C33.973 45.0373 30.62 46.9331 28.2711 49.8222C25.9222 52.7113 24.7507 56.3807 24.9908 60.0964C25.2308 63.8121 26.8648 67.3002 29.5659 69.863C32.267 72.4258 35.8361 73.8744 39.5593 73.9191C40.1191 73.9191 40.656 73.6967 41.0519 73.3008C41.4478 72.9049 41.6702 72.368 41.6702 71.8081Z"
        />
      </svg>
    </div>
  `,
  styles: [
    `
      .weather-icon {
      }
      .weather-icon svg {
        width: 100%;
      }
      .weather-icon .wi6-cloud {
      }
      .weather-icon .wi6-light line {
        stroke-width: 4.72932;
        stroke-miterlimit: 10;
        stroke-linecap: round;
      }
      .weather-icon .wi6-cloud {
        transform-origin: 59.072727% 44.25%;
        animation: wi6-move-cloud 4s infinite ease-in-out;
      }
      @keyframes wi6-move-cloud {
        0% {
          transform: translateX(0%);
        }
        50% {
          transform: translateX(-18.01362%);
        }
        100% {
          transform: translateX(0%);
        }
      }
      .weather-icon .wi6-light {
        transform-origin: 60.90909% 65.45454%;
        animation: wi6-move-light 4s infinite ease-in-out;
      }
      @keyframes wi6-move-light {
        0% {
          transform: translateX(0%);
        }
        50% {
          transform: translateX(-18.01362%);
        }
        100% {
          transform: translateX(0%);
        }
      }
      .weather-icon .wi6-light line:first-child {
        stroke-dasharray: 20;
        stroke-dashoffset: 60;
        animation: wi6-draw-line-1 2s infinite ease-in-out;
      }
      @keyframes wi6-draw-line-1 {
        0% {
          stroke-dashoffset: 60;
        }
        11% {
          stroke-dashoffset: 40;
        }
        50% {
          stroke-dashoffset: 40;
        }
        61% {
          stroke-dashoffset: 20;
        }
        100% {
          stroke-dashoffset: 20;
        }
      }
      .weather-icon .wi6-light line:nth-child(2) {
        stroke-dasharray: 15;
        stroke-dashoffset: 45;
        animation: wi6-draw-line-2 2s infinite ease-in-out;
      }
      @keyframes wi6-draw-line-2 {
        0% {
          stroke-dashoffset: 45;
        }
        11% {
          stroke-dashoffset: 45;
        }
        16% {
          stroke-dashoffset: 30;
        }
        55% {
          stroke-dashoffset: 30;
        }
        66% {
          stroke-dashoffset: 15;
        }
        100% {
          stroke-dashoffset: 15;
        }
      }
      .weather-icon .wi6-light line:last-child {
        stroke-dasharray: 20;
        stroke-dashoffset: 60;
        animation: wi6-draw-line-3 2s infinite ease-in-out;
      }
      @keyframes wi6-draw-line-3 {
        0% {
          stroke-dashoffset: 60;
        }
        16% {
          stroke-dashoffset: 60;
        }
        27% {
          stroke-dashoffset: 40;
        }
        66% {
          stroke-dashoffset: 40;
        }
        77% {
          stroke-dashoffset: 20;
        }
        100% {
          stroke-dashoffset: 20;
        }
      }
    `,
  ],
})
export class Icon200Component implements OnInit {
  @Input() primaryColor: string = '#00274e';
  @Input() thirdColor: string = '#a0c51e';
  @Input() width: string = '100px';

  ngOnInit(): void {}
}
