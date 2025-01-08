import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'wheater-icon-176',
  template: `
    <div class="weather-icon weather-icon-3" [style.width]="width">
      <!-- shortcode: wi3 -->
      <svg viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask class="wi3-mask" id="wi3-mask">
          <rect width="110" height="110" fill="white" />
          <g>
            <rect x="30" y="83" width="50" height="11" fill="black" />
            <path
              d="M31.9086 84.6548C32.422 84.6548 78.0064 84.2918 78.3695 84.6548C80.9366 84.6548 83.3986 83.6351 85.2138 81.8198C87.029 80.0046 88.0488 77.5426 88.0488 74.9755C88.0488 72.4084 87.029 69.9464 85.2138 68.1311C83.3986 66.3159 80.9366 65.2961 78.3695 65.2961H70.626C70.1126 65.2961 69.6202 65.0922 69.2572 64.7291C68.8941 64.3661 68.6901 63.8737 68.6901 63.3603C68.672 58.9045 66.9473 54.625 63.8708 51.4017C60.7943 48.1784 56.5997 46.2564 52.1496 46.0308C47.6994 45.8051 43.332 47.2931 39.9453 50.1887C36.5586 53.0843 34.4099 57.1675 33.9412 61.5986C37.1427 62.0843 40.0645 63.7004 42.1774 66.1542C44.2903 68.6081 45.4547 71.7374 45.4597 74.9755C45.4597 75.4889 45.2557 75.9813 44.8927 76.3444C44.5296 76.7074 44.0373 76.9114 43.5238 76.9114C43.0104 76.9114 42.518 76.7074 42.155 76.3444C41.7919 75.9813 41.588 75.4889 41.588 74.9755C41.588 73.0611 41.0203 71.1897 39.9567 69.5979C38.8931 68.0062 37.3814 66.7655 35.6127 66.0329C33.8441 65.3003 31.8978 65.1086 30.0202 65.4821C28.1426 65.8556 26.418 66.7775 25.0643 68.1311C23.7106 69.4848 22.7887 71.2095 22.4152 73.0871C22.0417 74.9648 22.2335 76.911 22.9661 78.6796C23.6987 80.4483 24.9393 81.96 26.531 83.0236C28.1228 84.0872 29.9942 84.6548 31.9086 84.6548Z"
              fill="black"
            />
          </g>
        </mask>
        <g class="wi3-rain">
          <line [attr.stroke]="thirdColor"  x1="43" y1="84" x2="39" y2="100" />
          <line [attr.stroke]="thirdColor" x1="55" y1="84" x2="53" y2="92" />
          <line [attr.stroke]="thirdColor" x1="67" y1="84" x2="63" y2="100" />
        </g>
        <g class="wi3-rays" mask="url(#wi3-mask)">
          <path [attr.stroke]="thirdColor" d="M104.995 53.0097L98.5596 53.0097" />
          <path [attr.stroke]="thirdColor" d="M96.0059 75.151L91.1655 70.4544" />
          <path [attr.stroke]="thirdColor" d="M72.817 84.5443V78.1087" />
          <path [attr.stroke]="thirdColor" d="M48.9846 75.822L54.5165 71.1253" />
          <path [attr.stroke]="thirdColor" d="M39.9952 53.0097H47.718" />
          <path [attr.stroke]="thirdColor" d="M49.6761 30.1973L54.5165 35.5649" />
          <path [attr.stroke]="thirdColor" d="M73.4606 21.475V27.9106" />
          <path [attr.stroke]="thirdColor" d="M95.9853 31.1285L91.4804 35.6334" />
          <path [attr.stroke]="thirdColor"
            d="M87.0497 53.3314C87.0497 60.9687 80.7235 67.2423 72.817 67.2423C64.9106 67.2423 58.5844 60.9687 58.5844 53.3314C58.5844 45.6942 64.9106 39.4205 72.817 39.4205C80.7235 39.4205 87.0497 45.6942 87.0497 53.3314Z"
          />
        </g>
        <path  [attr.fill]="primaryColor"
          class="wi3-cloud"
          d="M33.8445 86.5907C33.8445 86.0773 33.6405 85.5849 33.2774 85.2218C32.9144 84.8588 32.422 84.6548 31.9086 84.6548C29.9942 84.6548 28.1228 84.0872 26.531 83.0236C24.9393 81.96 23.6987 80.4483 22.9661 78.6796C22.2335 76.911 22.0417 74.9648 22.4152 73.0871C22.7887 71.2095 23.7106 69.4848 25.0643 68.1311C26.418 66.7775 28.1426 65.8556 30.0202 65.4821C31.8978 65.1086 33.8441 65.3003 35.6127 66.0329C37.3814 66.7655 38.8931 68.0062 39.9567 69.5979C41.0203 71.1897 41.588 73.0611 41.588 74.9755C41.588 75.4889 41.7919 75.9813 42.155 76.3444C42.518 76.7074 43.0104 76.9114 43.5238 76.9114C44.0373 76.9114 44.5296 76.7074 44.8927 76.3444C45.2557 75.9813 45.4597 75.4889 45.4597 74.9755C45.4547 71.7374 44.2903 68.6081 42.1774 66.1542C40.0645 63.7004 37.1427 62.0843 33.9412 61.5986C34.4099 57.1675 36.5586 53.0843 39.9453 50.1887C43.332 47.2931 47.6994 45.8051 52.1496 46.0308C56.5997 46.2564 60.7943 48.1784 63.8708 51.4017C66.9473 54.625 68.672 58.9045 68.6901 63.3603C68.6901 63.8737 68.8941 64.3661 69.2572 64.7291C69.6202 65.0922 70.1126 65.2961 70.626 65.2961H78.3695C80.9366 65.2961 83.3986 66.3159 85.2138 68.1311C87.029 69.9464 88.0488 72.4084 88.0488 74.9755C88.0488 77.5426 87.029 80.0046 85.2138 81.8198C83.3986 83.6351 80.9366 84.6548 78.3695 84.6548C77.8561 84.6548 77.3637 84.8588 77.0006 85.2218C76.6376 85.5849 76.4336 86.0773 76.4336 86.5907C76.4336 87.1041 76.6376 87.5965 77.0006 87.9596C77.3637 88.3226 77.8561 88.5266 78.3695 88.5266C81.9635 88.5266 85.4102 87.0989 87.9515 84.5576C90.4929 82.0162 91.9206 78.5695 91.9206 74.9755C91.9206 71.3815 90.4929 67.9347 87.9515 65.3934C85.4102 62.8521 81.9635 61.4244 78.3695 61.4244H72.5619C72.0409 56.1533 69.5741 51.2656 65.6431 47.7155C61.7122 44.1654 56.5993 42.2077 51.3025 42.2246C46.0058 42.2415 40.9055 44.2319 36.9973 47.8071C33.0891 51.3822 30.6536 56.2856 30.1663 61.5599C26.7856 62.0399 23.7106 63.7785 21.5565 66.428C19.4024 69.0775 18.3281 72.4426 18.5482 75.8502C18.7684 79.2577 20.2668 82.4566 22.7439 84.8069C25.2211 87.1572 28.4942 88.4856 31.9086 88.5266C32.422 88.5266 32.9144 88.3226 33.2774 87.9596C33.6405 87.5965 33.8445 87.1041 33.8445 86.5907Z"
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
      .weather-icon .wi3-cloud {
       
      }
      .weather-icon .wi3-rays path,
      .weather-icon .wi3-rain line {
        
        stroke-width: 4.72932;
        stroke-miterlimit: 10;
        stroke-linecap: round;
      }
      .weather-icon .wi3-rays,
      .weather-icon .wi3-mask g {
        animation: wi3-rotate-rays 10s infinite linear;
        transform-origin: 65.90909% 48.19545%;
      }
      @keyframes wi3-rotate-rays {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }
      .weather-icon .wi3-mask g {
        animation-direction: reverse;
      }
      .weather-icon .wi3-cloud {
        transform-origin: 50.2% 59.42727%;
        animation: wi3-move-cloud 4s infinite ease-in-out;
      }
      @keyframes wi3-move-cloud {
        0% {
          transform: translateX(0%);
        }
        50% {
          transform: translateX(-15.01362%);
        }
        100% {
          transform: translateX(0%);
        }
      }
      .weather-icon .wi3-mask path {
        transform-origin: 50.2% 59.42727%;
        animation: wi3-move-mask 4s infinite ease-in-out;
      }
      @keyframes wi3-move-mask {
        0% {
          transform: translateX(0%);
        }
        50% {
          transform: translateX(-15.01362%);
        }
        100% {
          transform: translateX(0%);
        }
      }
      .weather-icon .wi3-mask g rect {
        transform-origin: 50% 80.454545%;
        animation: wi3-move-mask-rect 4s infinite ease-in-out;
      }
      @keyframes wi3-move-mask-rect {
        0% {
          transform: translateX(0%);
        }
        50% {
          transform: translateX(-17.04%);
        }
        100% {
          transform: translateX(0%);
        }
      }
      .weather-icon .wi3-rain {
        transform-origin: 49.0909% 83.6363%;
        animation: wi3-move-rain 4s infinite ease-in-out;
      }
      @keyframes wi3-move-rain {
        0% {
          transform: translateX(0%);
        }
        50% {
          transform: translateX(-15.01362%);
        }
        100% {
          transform: translateX(0%);
        }
      }
      .weather-icon .wi3-rain line {
        opacity: 0;
      }
      .weather-icon .wi3-rain line:first-child,
      .weather-icon .wi3-rain line:last-child {
        stroke-dasharray: 20;
        stroke-dashoffset: 20;
        animation: wi3-rain-line-1 2s infinite ease-in-out;
      }
      .weather-icon .wi3-rain line:last-child {
        animation-delay: 0.1s;
      }
      @keyframes wi3-rain-line-1 {
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
      .weather-icon .wi3-rain line:nth-child(2) {
        stroke-dasharray: 10;
        stroke-dashoffset: 10;
        animation: wi3-rain-line-2 2s infinite ease-in-out;
        animation-delay: 0.05s;
      }
      @keyframes wi3-rain-line-2 {
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
export class Icon176Component implements OnInit {
  @Input() primaryColor: string = '#00274e';
  @Input() thirdColor: string = '#a0c51e';
  @Input() width: string = '100px';


  ngOnInit(): void {}
}
