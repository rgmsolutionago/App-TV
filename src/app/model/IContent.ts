export interface IRangeContent {
  start: string;
  end: string;
}
export interface IDateContent {
  days: string[];
  date_range: IRangeContent;
  range_hour: IRangeContent[];
}
export interface IContent {
  date: IDateContent;
  days: any;
  age?: string;
  hours: any;
  md5: string;
  position: number;
  time: number;
  url: string;
  base64: string;
  mime: string;
  ext: string;
  source: string;
  poster: string;
  name: string;
  downloaded: boolean;
  downloading: boolean;
  repeat?: number;
  maskAsView: boolean;
  uuid: string;
}

export enum IDisplay {
  CONTENT = 'CONTENT',
  SLIDE_NEWS = 'SLIDE_NEWS',
  ONE_CALLERS = 'ONE_CALLERS',
  TWO_CALLERS = 'TWO_CALLERS',
  THRE_CALLERS = 'THRE_CALLERS',
  FOUR_CALLERS = 'FOUR_CALLERS',
  FIVE_CALLERS = 'FIVE_CALLERS',
  LOGO = 'LOGO',
  SPORT_FOOTBALL = 'SPORT_FOOTBALL',
  SPORT_PADDEL = 'SPORT_PADDEL',
}
