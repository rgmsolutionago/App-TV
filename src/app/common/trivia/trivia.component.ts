import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ICallers } from 'src/app/model/ICallers';
import { ITrivia } from 'src/app/model/ITrivia';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TriviaService } from 'src/app/services/trivia.service';
import { getModuleVideo, registerLog } from 'src/app/util/common';
import { TIME_PAUSE } from 'src/environments/environment';

@Component({
  selector: 'trivia-preview',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss'],
})
export class TriviaComponent implements OnInit {
  @Input() widthContainer!: number;
  @Input() heightContainer!: number;
  @ViewChild('video') video!: ElementRef;

  showQuestion: boolean = false;
  showCorrectAnswer: boolean = false;

  countAnimation = new Array(59).fill(0);

  triviaInfo!: ITrivia| any;
  constructor(
    public dashboardService: DashboardService,
    public triviaService: TriviaService,
    public appConfigService: AppConfigService
  ) {}

  led: boolean = true;
  animateLed(callback: Function) {
    this.led = false;
    const T = 200;
    setTimeout(() => {
      this.led = false;
      setTimeout(() => {
        this.led = true;
        setTimeout(() => {
          this.led = false;
          setTimeout(() => {
            this.led = true;
            setTimeout(() => {
              this.led = false;
              setTimeout(() => {
                this.led = true;
                callback();
              }, T);
            }, T);
          }, T);
        }, T);
      }, T);
    }, T);
  }

  shuffle(array: any) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  ngOnInit() {
    this.triviaInfo = this.triviaService.getNextTriviaItem();
    if (this.triviaInfo) {
      let answer = this.triviaInfo?.question_and_answer?.options;
      answer = this.shuffle(answer);
      this.triviaInfo.question_and_answer.options = answer;
    }
  }

  ngAfterViewInit() {
    if (this.triviaInfo) {
      this.inicializeVideo(this.getVideo());
    } else {
      this.nextSlide();
    }
  }

  nextSlide() {
    this.dashboardService.nextContent();
  }

  getVideo() {
    let isFull =
      (this.appConfigService.displayScreen.value !== 2 &&
        this.dashboardService.callersData.length <= 1) ||
      (this.appConfigService.displayScreen.value === 2 &&
        this.dashboardService.callersData.length === 0);

    return getModuleVideo(
      'trivia',
      this.appConfigService.displayScreen.value === 2,
      isFull,
      this.triviaInfo?.question_and_answer?.category?.toLowerCase()
    );
  }
  second: number = 15;
  runCounter() {
    setInterval(() => {
      this.second = this.second - 1;
    }, 1000);
  }

  interval: any;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    let selectedCaller;
    this.dashboardService.callersData.forEach((caller: ICallers) => {
      if (caller.key_code_up == parseInt(event.key)) {
        selectedCaller = caller;
      }
      if (caller.key_code_down == parseInt(event.key)) {
        selectedCaller = caller;
      }
    });

    if (selectedCaller) {
      this.video.nativeElement.pause();
      setTimeout(() => {
        this.video.nativeElement.play();
      }, TIME_PAUSE);
    }
  }
  inicializeVideo(src = '') {
    this.video.nativeElement.src = src;
    this.video.nativeElement.load();

    this.play();
    this.video.nativeElement.addEventListener(
      'ended',
      () => {
        this.runCounter();
        this.showQuestion = true;
        setTimeout(() => {
          this.animateLed(() => {
            this.showCorrectAnswer = true;
            setTimeout(() => {
              this.nextSlide();
            }, 4000);
          });
        }, this.second * 1000);
      },
      false
    );
  }

  pause() {
    this.video.nativeElement.pause();
  }
  play(reset: boolean = true) {
    if (reset) {
      this.video.nativeElement.pause();
      this.video.nativeElement.currentTime = 0;
    }
    if (!this.appConfigService.configsData?.audio)
      this.video.nativeElement.volume = 0;
    else this.video.nativeElement.volume = 1;
    try {
      this.video.nativeElement
        .play()
        .then((r: any) => {})
        .catch((e: any) => {
          this.nextSlide();
        });
    } catch (error) {
      registerLog(JSON.stringify(error));
      this.nextSlide();
    }
  }
}
