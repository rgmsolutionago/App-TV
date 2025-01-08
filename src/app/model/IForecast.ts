export interface IForecast {
  avg_temperature: number;
  code: number;
  country: string;
  date: string;
  description: string;
  humidity: number;
  max_temperature: number;
  min_temperature: number;
  state: string;
  uv: number;
  wind: number;
  alert: IAlert;
}

export interface IAlert {
  level: number;
  type: string;
  info: string;
}

