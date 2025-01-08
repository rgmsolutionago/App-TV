export interface IWeather {
  code: number;
  country: string;
  date: string;
  description: string;
  humidity: number;
  state: string;
  temp_c: number;
  wind: number;
  uv: number;
  max_temperature: number;
  min_temperature: number;
  
  alert: IAlert;
  isToday:boolean
}

export interface IAlert {
  level: number;
  type: string;
  info: string;
}
