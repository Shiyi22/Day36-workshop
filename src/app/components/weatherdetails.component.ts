import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { WeatherService } from '../services/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Weather } from '../model/weather';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.css']
})
export class WeatherdetailsComponent implements OnInit, OnDestroy  {

  openweatherApiKey: string = environment.openWeatherApiKey;
  private city: string = 'London';
  // private couuntry?: string
  // private imageUrl?: string

  params$!: Subscription
  model = new Weather(this.city,0,0,0,'','',0,0); 

  constructor(private weatherSvc: WeatherService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // capture activated route 
    this.params$ = this.activatedRoute.params.subscribe(
      (params) => {
        this.city = params['city'] // 'city' should match routing.ts: weather/:city
      }
    )
    this.getWeatherDetailsFromApi(this.city)
  }

  getWeatherDetailsFromApi(city: string) {
    this.weatherSvc.getWeather(city, this.openweatherApiKey)
      .then( async (result) => {
        console.log(result)
        const cityImageUrl = await this.weatherSvc.getCityUrl(city)
        this.model = new Weather( // Weather is a class
          city,
          result.main.temp,
          result.main.pressure,
          result.main.humidity,
          result.weather[0].description,
          cityImageUrl,
          result.wind.speed,
          result.wind.degree
        )
      }).catch( (err) => {
        console.log(err)
        this.router.navigate(['']); // navigate to home page
      })
  }

  ngOnDestroy(): void {
    this.params$.unsubscribe() 
  }
}
