import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'wheater-icon-253',
  template: `
    <div class="weather-icon weather-icon-4" [style.width]="width"><!-- shortcode: wi4 -->
      <svg viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g class="wi4-rain">
          <line [attr.stroke]="thirdColor" x1="53" y1="69" x2="49" y2="85" />
          <line [attr.stroke]="thirdColor" x1="65" y1="69" x2="63" y2="77" />
          <line [attr.stroke]="thirdColor" x1="77" y1="69" x2="73" y2="85" />
        </g>
        <path [attr.fill]="primaryColor" class="wi4-cloud" d="M41.6702 71.8781C41.6702 71.3183 41.4478 70.7814 41.0519 70.3855C40.656 69.9896 40.1191 69.7672 39.5593 69.7672C37.4718 69.7672 35.4311 69.1482 33.6954 67.9884C31.9597 66.8287 30.607 65.1803 29.8081 63.2517C29.0093 61.3231 28.8002 59.2009 29.2075 57.1535C29.6147 55.1061 30.62 53.2254 32.0961 51.7493C33.5722 50.2732 35.4528 49.268 37.5002 48.8608C39.5476 48.4535 41.6698 48.6625 43.5984 49.4614C45.527 50.2602 47.1754 51.6131 48.3352 53.3488C49.4949 55.0845 50.1139 57.1251 50.1139 59.2126C50.1139 59.7724 50.3364 60.3094 50.7322 60.7052C51.1281 61.1011 51.665 61.3235 52.2249 61.3235C52.7847 61.3235 53.3216 61.1011 53.7175 60.7052C54.1133 60.3094 54.3358 59.7724 54.3358 59.2126C54.3303 55.6816 53.0607 52.2694 50.7567 49.5937C48.4527 46.918 45.2668 45.1557 41.7757 44.6261C42.2868 39.7943 44.6297 35.3419 48.3227 32.1844C52.0157 29.027 56.7781 27.4045 61.6306 27.6505C66.4831 27.8965 71.057 29.9923 74.4117 33.5071C77.7665 37.0218 79.6471 41.6883 79.6669 46.547C79.6669 47.1069 79.8893 47.6438 80.2852 48.0397C80.6811 48.4356 81.218 48.658 81.7778 48.658H90.2215C93.0208 48.658 95.7054 49.77 97.6847 51.7493C99.6641 53.7287 100.776 56.4133 100.776 59.2126C100.776 62.0118 99.6641 64.6965 97.6847 66.6758C95.7054 68.6552 93.0208 69.7672 90.2215 69.7672C89.6617 69.7672 89.1248 69.9896 88.7289 70.3855C88.333 70.7814 88.1106 71.3183 88.1106 71.8781C88.1106 72.438 88.333 72.9749 88.7289 73.3708C89.1248 73.7667 89.6617 73.9891 90.2215 73.9891C94.1405 73.9891 97.8989 72.4323 100.67 69.6611C103.441 66.89 104.998 63.1316 104.998 59.2126C104.998 55.2936 103.441 51.5352 100.67 48.764C97.8989 45.9929 94.1405 44.4361 90.2215 44.4361H83.8887C83.3206 38.6884 80.6308 33.3587 76.3443 29.4875C72.0579 25.6164 66.4827 23.4817 60.7069 23.5001C54.9312 23.5186 49.3697 25.6889 45.1081 29.5874C40.8466 33.4859 38.1909 38.8327 37.6595 44.5839C33.973 45.1073 30.62 47.0031 28.2711 49.8922C25.9222 52.7813 24.7507 56.4507 24.9908 60.1664C25.2308 63.8821 26.8648 67.3702 29.5659 69.933C32.267 72.4958 35.8361 73.9444 39.5593 73.9891C40.1191 73.9891 40.656 73.7667 41.0519 73.3708C41.4478 72.9749 41.6702 72.438 41.6702 71.8781Z" />
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
      .weather-icon .wi4-cloud {
        
      }
      .weather-icon .wi4-rain line {       
        stroke-width: 4.72932;
        stroke-miterlimit: 10;
        stroke-linecap: round;
      }
      .weather-icon .wi4-cloud {
        transform-origin: 59.072727% 48.675%;
        animation: wi4-move-cloud 4s infinite ease-in-out;
      }
      @keyframes wi4-move-cloud {
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
      .weather-icon .wi4-rain {
        transform-origin: 49.0909% 83.6363%;
        animation: wi4-move-rain 4s infinite ease-in-out;
      }
      @keyframes wi4-move-rain {
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
      .weather-icon .wi4-rain line {
        opacity: 0;
      }
      .weather-icon .wi4-rain line:first-child,
      .weather-icon .wi4-rain line:last-child {
        stroke-dasharray: 20;
        stroke-dashoffset: 20;
        animation: wi4-rain-line-1 2s infinite ease-in-out;
      }
      .weather-icon .wi4-rain line:last-child {
        animation-delay: 0.1s;
      }
      @keyframes wi4-rain-line-1 {
        0% {
          stroke-dashoffset: 60;
          opacity: 0;
        }
        10% {
          stroke-dashoffset: 60;
          opacity: 0;
        }
        30% {
          opacity: 1;
        }
        40% {
          stroke-dashoffset: 40;
          opacity: 1;
        }
        60% {
          stroke-dashoffset: 40;
          opacity: 1;
        }
        70% {
          opacity: 1;
        }
        90% {
          stroke-dashoffset: 20;
          opacity: 0;
        }
        100% {
          stroke-dashoffset: 20;
          opacity: 0;
        }
      }
      .weather-icon .wi4-rain line:nth-child(2) {
        stroke-dasharray: 10;
        stroke-dashoffset: 10;
        animation: wi4-rain-line-2 2s infinite ease-in-out;
        animation-delay: 0.05s;
      }
      @keyframes wi4-rain-line-2 {
        0% {
          stroke-dashoffset: 30;
          opacity: 0;
        }
        10% {
          stroke-dashoffset: 30;
          opacity: 0;
        }
        30% {
          opacity: 1;
        }
        40% {
          stroke-dashoffset: 20;
          opacity: 1;
        }
        60% {
          stroke-dashoffset: 20;
          opacity: 1;
        }
        70% {
          opacity: 1;
        }
        90% {
          stroke-dashoffset: 10;
          opacity: 0;
        }
        100% {
          stroke-dashoffset: 10;
          opacity: 0;
        }
      }
    `,
  ],
})
export class Icon253Component implements OnInit {
  @Input() primaryColor: string = '#00274e';
  @Input() thirdColor: string = '#a0c51e';
  @Input() width: string = '100px';

  ngOnInit(): void {}
}
