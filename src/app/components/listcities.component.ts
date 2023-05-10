import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-listcities',
  templateUrl: './listcities.component.html',
  styleUrls: ['./listcities.component.css']
})
export class ListcitiesComponent implements OnInit {

  cities: any; 

  constructor (private weatherSvc: WeatherService) {}

  async ngOnInit() {
    // this.weatherSvc.sortCities()
    this.cities = await this.weatherSvc.getAllCities(); 
  }

}
