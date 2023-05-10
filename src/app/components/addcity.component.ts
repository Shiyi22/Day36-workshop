import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { City } from '../model/city';

@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.css']
})
export class AddcityComponent implements OnInit {

  form!: FormGroup
  country!: string
  city!: string
  imageUrl!: string
  cityObj!: City
  
  constructor(private fb: FormBuilder, private router: Router, private weatherSvc: WeatherService) {}

  ngOnInit(): void {
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      country: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]), 
      imageUrl: this.fb.control('')
    })
  }

  add() {
    this.country = this.form?.value['country']
    this.city = this.form?.value['city']
    this.imageUrl = this.form?.value['imageUrl']
    this.cityObj = {country: this.country, city: this.city, imageUrl: this.imageUrl}
    this.weatherSvc.addCity(this.cityObj)
    this.router.navigate(['/'])
  }
}
