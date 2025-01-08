import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherItemComponent } from './components/weather/weather-item/weather-item.component';
import { IonicModule } from '@ionic/angular';
import { SlideItemComponent } from './components/slide/slide-item/slide-item.component';
import { SlidesComponent } from './components/slide/slides/slides.component';
import { VideoPreviewComponent } from './common/video-preview/video-preview.component';
import { ImagePreviewComponent } from './common/image-preview/image-preview.component';
import { CallerItemComponent } from './components/callers/caller-item/caller-item.component';
import { CallersComponent } from './components/callers/callers/callers.component';
import { SportItemComponent } from './components/sports/sport-item/sport-item.component';
import { NewsItemComponent } from './components/news/news-item/news-item.component';
import { LoaderComponent } from './components/common/loader/loader.component';
import { DynamicContentComponent } from './components/dashboard/dynamic-content/dynamic-content.component';
import { DobledLogoComponent } from './components/common/dobled-logo/dobled-logo.component';
import { CallersItemFullComponent } from './components/callers/callers-item-full/callers-item-full.component';
import { ForescastItemComponent } from './components/weather/forescast-item/forescast-item.component';
import { RatesItemComponent } from './components/rates/rates-item/rates-item.component';
import { WeatherIconPipe } from './pipe/WeatherIconPipe';
import { SlideLoaderComponent } from './components/slide/slide-loader/slide-loader.component';
import { TriviaComponent } from './common/trivia/trivia.component';
import { BytesPipe } from './pipe/BytesPipe';
import { LikeToDayComponent } from './common/likeToDay/likeToDay.component';
import { DidYouKnowComponent } from './common/didYouKnow/didYouKnow.component';
import { Modal402Component } from './components/modal402/modal402.component';
import { MovieComponent } from './common/movie/movie.component';
import { ShowsComponent } from './common/shows/shows.component';
import { ReviewsComponent } from './common/reviews/reviews.component';
import { StarRatingModule } from 'angular-star-rating';
import { VerticalComponent } from './display/vertical/vertical.component';
import { DesktopComponent } from './display/desktop/desktop.component';
import player from 'lottie-web';
import { RatesComponent } from './components/rates/rates-item/rates.component';
import { Icon113Component } from './components/weather/weatherIcon/icon113.component';
import { Icon116Component } from './components/weather/weatherIcon/icon116.component';
import { Icon176Component } from './components/weather/weatherIcon/icon176.component';
import { Icon253Component } from './components/weather/weatherIcon/icon253.component';
import { Icon227Component } from './components/weather/weatherIcon/icon227.component';
import { Icon200Component } from './components/weather/weatherIcon/icon200.component';
import { IconSelecterComponent } from './components/weather/weatherIcon/icon-selector.components';
import { ScoreItemComponent } from './components/common/score-item/score-item.component';
import { DateCardComponent } from './components/common/date-card/date-card.component';
import { RemainTimeCardComponent } from './components/common/remain-time-card/remain-time-card.component';
import { InstagramComponent } from './common/instagram/instagram.component';

export function playerFactory() {
  return player;
}
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    StarRatingModule.forRoot(),
   // LottieModule.forRoot({ player: playerFactory }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ScoreItemComponent,
    DateCardComponent,
    WeatherItemComponent,
    SlideItemComponent,
    SlidesComponent,
    VideoPreviewComponent,
    ImagePreviewComponent,
    CallerItemComponent,
    CallersComponent,
    SportItemComponent,
    CallersItemFullComponent,
    NewsItemComponent,
    LoaderComponent,
    DynamicContentComponent,
    DobledLogoComponent,
    ForescastItemComponent,
    RatesItemComponent,
    WeatherIconPipe,
    SlideLoaderComponent,
    TriviaComponent,
    InstagramComponent,
    LikeToDayComponent,
    DidYouKnowComponent,
    BytesPipe,
    SlideLoaderComponent,
    Modal402Component,
    MovieComponent,
    ShowsComponent,
    ReviewsComponent,
    VerticalComponent,
    DesktopComponent,
    RatesComponent,
    Icon113Component,
    Icon116Component,
    Icon176Component,
    Icon253Component,
    Icon227Component,
    Icon200Component,
    IconSelecterComponent,
    RemainTimeCardComponent
  ],
  exports: [
    RemainTimeCardComponent,
    ScoreItemComponent,
    DateCardComponent,
    WeatherItemComponent,
    SlideItemComponent,
    InstagramComponent,
    SlidesComponent,
    VideoPreviewComponent,
    ImagePreviewComponent,
    CallerItemComponent,
    CallersComponent,
    SportItemComponent,
    NewsItemComponent,
    LoaderComponent,
    DynamicContentComponent,
    DobledLogoComponent,
    CallersItemFullComponent,
    ForescastItemComponent,
    RatesItemComponent,
    WeatherIconPipe,
    SlideLoaderComponent,
    TriviaComponent,
    LikeToDayComponent,
    DidYouKnowComponent,
    BytesPipe,
    Modal402Component,
    MovieComponent,
    ShowsComponent,
    ReviewsComponent,
    VerticalComponent,
    DesktopComponent,
    RatesComponent,
    Icon113Component,
    Icon116Component,
    Icon176Component,
    Icon253Component,
    Icon227Component,
    Icon200Component,
    IconSelecterComponent
  ],
})
export class SharedModule {}
