import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { City } from '../model/city';
import { environment } from 'src/environments/environment.development';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends Dexie {

  // to be replaced in Day 38 workshop
  // countries = [
  //   // {country: 'Singapore', city: 'Singapore'},
  //   {country: 'United Kingdom', city: 'London'},
  //   {country: 'Malaysia', city: 'Kuala Lumpur'},
  //   {country: 'Indonesia', city: 'Jakarta'},
  //   {country: 'China', city: 'Beijing'},
  //   {country: 'India', city: 'New Delhi'},
  //   {country: 'Thailand', city: 'Bangkok'}
  // ]; 

  // Day 38 Workshop: 
  city!: Dexie.Table<City, string> // <schema, primary key> 

  // imageUrlCities = [
  //   // {city: 'Singapore', imageUrl: ''},
  //   {city: 'London', imageUrl: 'https://bit.ly/44Ax1bN'},
  //   {city: 'Kuala Lumpur', imageUrl: 'https://bit.ly/3VnJStz'},
  //   {city: 'Jakarta', imageUrl: 'https://bit.ly/3LpVyHK'},
  //   {city: 'Beijing', imageUrl: 'https://bit.ly/3LrYT9d'},
  //   {city: 'New Delhi', imageUrl: 'https://bit.ly/3nrvgwH'},
  //   {city: 'Bangkok', imageUrl: 'https://bit.ly/3LOJxN7'}
  // ]; 

  // Day 38 Workshop: 
  constructor(private http: HttpClient) {
    super('citiesdb'); // db name
    this.version(1).stores({
      city: 'city'
    }); 
    this.city = this.table('city')
  }

  getWeather(city: string, apiKey: string): Promise<any> {
    const params = new HttpParams().set('q', city).set('appid', apiKey); 
    return lastValueFrom (this.http.get(environment.openWeatherApiUrl, { params: params })) 
  }

  // Day 38 Workshop: combine sort 
  async getAllCities() {
    return await this.city.orderBy('city').toArray(); 
  }

  // getCityUrl(city: string) {
  //   const w = this.imageUrlCities.find(v => v.city == city); 
  //   console.log(w)
  //   return w
  // }

  // Day 38 Workshop:
  async getCityUrl(cityName: string): Promise<any> {
    const result = await this.city.get(cityName); 
    return result?.imageUrl;
  }

  // addCity(city: City) {
  //   this.countries.push({country: city.country, city: city.city}); 
  //   this.sortCities()
  //   this.imageUrlCities.push({city: city.city, imageUrl: city.imageUrl}); 
  // }

  // Day 38 Workshop: 
  async addCity(city: City) {
    return this.city.add(city)
  }

  // sortCities() {
  //   this.countries.sort((a, b) => (b.country > a.country) ? 1: -1); // sort by alphabetical order 
  // }

}
