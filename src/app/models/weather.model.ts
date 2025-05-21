import { CoordinatesModel } from './coordinates.model';

export interface ApiWeatherResponse
  extends Omit<ListItem, 'pop' | 'rain' | 'sys' | 'dt_txt'> {
  coord: CoordinatesModel;
  base: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface FiveDaysForecast {
  cod: string;
  message: number;
  cnt: number;
  list: ListItem[];
}

export interface ListItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface FormattedForecast {
  day: string;
  date: Date;
  icon: string;
  min: number;
  max: number;
  weather: string;
}
