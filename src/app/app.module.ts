import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddcityComponent } from './components/addcity.component';
import { ListcitiesComponent } from './components/listcities.component';
import { WeatherdetailsComponent } from './components/weatherdetails.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module';
import { WeatherService } from './services/weather.service';
import Dexie from 'dexie';


@NgModule({
  declarations: [
    AppComponent,
    AddcityComponent,
    ListcitiesComponent,
    WeatherdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, MaterialModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
  ],
  providers: [Dexie, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }

