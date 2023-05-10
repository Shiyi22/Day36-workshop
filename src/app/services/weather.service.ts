import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { City } from '../model/city';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  countries = [
    // {country: 'Singapore', city: 'Singapore'},
    {country: 'United Kingdom', city: 'London'},
    {country: 'Malaysia', city: 'Kuala Lumpur'},
    {country: 'Indonesia', city: 'Jakarta'},
    {country: 'China', city: 'Beijing'},
    {country: 'India', city: 'New Delhi'},
    {country: 'Thailand', city: 'Bangkok'}
  ]; 

  imageUrlCities = [
    // {city: 'Singapore', imageUrl: ''},
    {city: 'London', imageUrl: 'https://bit.ly/44Ax1bN'},
    {city: 'Kuala Lumpur', imageUrl: 'https://bit.ly/3VnJStz'},
    {city: 'Jakarta', imageUrl: 'https://bit.ly/3LpVyHK'},
    {city: 'Beijing', imageUrl: 'https://bit.ly/3LrYT9d'},
    {city: 'New Delhi', imageUrl: 'https://bit.ly/3nrvgwH'},
    {city: 'Bangkok', imageUrl: 'https://bit.ly/3LOJxN7'}
  ]; 

  constructor(private http: HttpClient) { }

  getWeather(city: string, apiKey: string): Promise<any> {
    const params = new HttpParams().set('q', city).set('appid', apiKey); 
    return lastValueFrom (this.http.get(environment.openWeatherApiUrl, { params: params })) 
  }

  getCityUrl(city: string) {
    const w = this.imageUrlCities.find(v => v.city == city); 
    console.log(w)
    return w
  }

  addCity(city: City) {
    this.countries.push({country: city.country, city: city.city}); 
    this.sortCities()
    this.imageUrlCities.push({city: city.city, imageUrl: city.imageUrl}); 
  }

  sortCities() {
    this.countries.sort((a, b) => (b.country > a.country) ? 1: -1); // sort by alphabetical order 
  }
}
