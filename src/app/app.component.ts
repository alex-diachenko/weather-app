import { Component, computed, Signal } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { WeatherCardComponent } from "./components/weather-card/weather-card.component";
import { ApiWeatherResponse } from './models/weather.model';
import { ButtonModule } from 'primeng/button';
import { CurrentWeatherObj, DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  imports: [SearchComponent, WeatherCardComponent, WeatherCardComponent, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weather-forecast';
  foundForecast: any = null;
  favouriteLocations: Signal<any[]> = computed(() => this.dataService.favouriteLocations())

  constructor(private dataService: DataService) {}

  addToLocations(): void {
  }

  searchedCity(event: CurrentWeatherObj): void {
    this.foundForecast = event;
  }
}
