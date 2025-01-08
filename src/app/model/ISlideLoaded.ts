import { DidYouKnow } from './DidYouKnow';
import { IContent } from './IContent';
import { IInstagram } from './IInstagram';
import { IlikeToDay } from './IlikeToDay';
import { IReview } from './IReview';
import { IShow } from './IShow';
import { ITrivia } from './ITrivia';
import { Movie } from './movie';

export interface OptLoaded {
  loaded: boolean; 
  items?: IContent[] | ITrivia[] | IInstagram[] | IlikeToDay[] | Movie[] | DidYouKnow[]  | IShow[]  | IReview[];
}
export interface ISlideLoaded {
  content: OptLoaded;
  trivia: OptLoaded;
  did_you_know: OptLoaded;
  a_day_like_today: OptLoaded;
  movie: OptLoaded;
  review: OptLoaded;
  shows: OptLoaded;
  instagram: OptLoaded;

}
