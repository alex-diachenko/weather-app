import { Component, computed } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-card',
  imports: [CardModule, CommonModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {
  currentWeather = computed(() => this.dataService.currentWeather());
  // currentWeatherForecast = computed(() => this.dataService.currentWeatherForecast());

  constructor(private dataService: DataService) {
  }
}
