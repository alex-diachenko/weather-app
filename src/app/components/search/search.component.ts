import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, of, switchMap } from 'rxjs';
import { CurrentWeatherObj, DataService } from '../../services/data.service';
import { CityModel } from '../../models/city.model';
import { ApiWeatherResponse, FiveDaysForecast } from '../../models/weather.model';
import { WeatherService } from '../../services/weather.service';
import { CoordinatesModel } from '../../models/coordinates.model';

@Component({
  selector: 'app-search',
  imports: [ButtonModule, InputTextModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  foundForecast = output<CurrentWeatherObj>();
  searchData: string = '';
  coordinates: CoordinatesModel = {
    lat: 0,
    lon: 0
  };
  isNotFound = false;
  notFoundMessage = 'City not found';

  constructor(
    private readonly weatherService: WeatherService,
    private readonly dataService: DataService
  ) {}

  searchWeather(): void {
    this.isNotFound = false;

    this.weatherService
      .getCityInfo(this.searchData)
      .pipe(
        switchMap((data: CityModel[]): Observable<ApiWeatherResponse | null> => {
          if (data.length === 0) {
            this.isNotFound = true;
            this.dataService.currentWeather.set({})
            return of(null);
          }

          this.coordinates = { lat: data[0].lat, lon: data[0].lon };

          return this.weatherService.getCurrentWeather(this.coordinates);
        }),
        switchMap(
          (
            weather: ApiWeatherResponse | null
          ): Observable<FiveDaysForecast | null> => {
            if (weather === null) return of(null);

            this.dataService.setWeatherObj(weather, this.searchData);

            return this.weatherService.getWeatherFiveDays(this.coordinates);
          }
        )
      )
      .subscribe((weather: FiveDaysForecast | null) => {
        if (weather === null) return;

        const forecast = this.dataService.formatFiveDaysWeather(weather);
        this.dataService.currentWeather.update((val: Partial<CurrentWeatherObj>) => {
          const currWeather = {...val, forecast}
          this.foundForecast.emit(currWeather as CurrentWeatherObj);

          return currWeather
        });
      });
  }
}
