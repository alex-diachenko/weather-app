import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  ApiWeatherResponse,
  FiveDaysForecast,
  FormattedForecast,
  ListItem,
} from '../models/weather.model';
import { DatePipe } from '@angular/common';

export interface CurrentWeatherObj {
  temp: number;
  feels: number;
  humidity: number;
  icon: string;
  main: string;
  city: string;
  windSpeed: number;
  forecast: FormattedForecast[];
}

@Injectable({ providedIn: 'root' })
export class DataService {
  currentWeather: WritableSignal<Partial<CurrentWeatherObj>> =
    signal({});
  //   currentWeatherForecast: WritableSignal<any> = signal(null);

  favouriteLocations: WritableSignal<any[]> = signal([]);

  setWeatherObj(currentWeather: ApiWeatherResponse, city: string): void {
    this.currentWeather.set({
      temp: Math.round(currentWeather.main.temp),
      feels: Math.round(currentWeather.main.feels_like),
      humidity: currentWeather.main.humidity,
      icon: currentWeather.weather[0].icon,
      main: currentWeather.weather[0].main,
      city,
      windSpeed: currentWeather.wind.speed,
    });
  }

  formatCurrentWeatherObj(data: ApiWeatherResponse) {
    return {
      temp: Math.round(data.main.temp),
      title: data.weather[0].main,
      desc: data.weather[0].description,
      icon: data.weather[0].icon,
    };
  }

  formatFiveDaysWeather(data: FiveDaysForecast) {
    let result: { [key: string]: FormattedForecast } = {};
    data.list.forEach((el: ListItem) => {
      const key = new Date(el.dt_txt).getDay();

      if (!result.hasOwnProperty(key)) {
        result[key] = {
          day: new DatePipe('en-US').transform(
            new Date(el.dt_txt),
            'EEEE'
          ) as string,
          date: new Date(el.dt_txt),
          icon: el.weather[0].icon,
          min: Math.floor(el.main.temp_min),
          max: Math.ceil(el.main.temp_max),
          weather: el.weather[0].main,
        };
      } else {
        result[key].min = Math.floor(
          result[key].min < el.main.temp_min
            ? result[key].min
            : el.main.temp_min
        );
        result[key].max = Math.ceil(
          result[key].max > el.main.temp_max
            ? result[key].max
            : el.main.temp_max
        );
      }
    });

    return Object.values(result).sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
}
