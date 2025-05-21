import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CityModel } from '../models/city.model';
import { CoordinatesModel } from '../models/coordinates.model';
import { FiveDaysForecast, ApiWeatherResponse } from '../models/weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private readonly http: HttpClient) {}

  getWeatherFiveDays(
    coordinates: CoordinatesModel
  ): Observable<FiveDaysForecast> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${environment.apiKey}&units=metric`
    ) as Observable<FiveDaysForecast>;
  }

  getCurrentWeather(coordinates: CoordinatesModel): Observable<ApiWeatherResponse> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${environment.apiKey}&units=metric`
    ) as Observable<ApiWeatherResponse>;
  }

  getCityInfo(city: string): Observable<CityModel[]> {
    return this.http.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${environment.apiKey}`
    ) as Observable<CityModel[]>;
  }

  
}
