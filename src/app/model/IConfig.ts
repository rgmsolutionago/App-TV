import { IInstagram } from './IInstagram';

export interface IDisplay {
  display: number;
  machine_key: string;
  position: any;
}

export interface IModuleSetting {
  enable: boolean;
  repeat: number;
}
export interface IModule {
  a_day_like_today: IModuleSetting;
  did_you_know: IModuleSetting;
  movie: IModuleSetting;
  show: IModuleSetting;
  trivia: IModuleSetting;
  review: IModuleSetting;
  instagram: IModuleSetting;
}
export interface IConfig {
  languaje: string;
  logo: string;
  color_logo: boolean;
  Riddles: boolean;
  UpdatedAt: string;
  audio: boolean;
  basketball: boolean;
  callers: boolean;
  callers_linked: boolean;
  color: string;
  country: string;
  exchanges: boolean;
  football: boolean;
  wheater: boolean;
  forecast: boolean;
  key: string;
  max_connections: number;
  news: boolean;
  state: string;
  display_options: IDisplay[];
  display: number;
  modules: IModule;
  is_active: boolean;
  background_color: string;
  primary_color: string;
  secondary_color: string;
  third_color: string;
  background_card: string;
  notification_color_text: string;
  uuid: string;

  slider_color_active: string;
  slider_color_disabled: string;
  firebase: boolean;

  instagram: string;
  instagram_enabled: boolean;
  instagram_max_displayed: 0;
}

export interface IKey {
  optionCaller?: number;
  keyPress?: string;
  bg1?: string;
  bg2?: string;
  number?: number;
  name?: string;
  open: boolean;
}

export enum ISlideType {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  TRIVIA = 'TRIVIA',
  LIKETODAY = 'LIKETODAY',
  DIDYOUNOW = 'DIDYOUNOW',
  MOVIE = 'MOVIE',
  SHOWS = 'SHOWS',
  REVIEWS = 'REVIEWS',
  INSTAGRAM = 'INSTAGRAM',
}
