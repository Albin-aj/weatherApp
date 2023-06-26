import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Datas, RootObject } from '../model/rapidPlace';
import { IWeather } from '../model/weather';
import { List, Rootforecast } from '../model/forcast';

@Injectable({
  providedIn: 'root'
})
export class PlaceAndWeatherService {

  PLACE_BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo"
  WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5"
  API_KEY = "dfcf63497698e598a82dd43eee8890c9"


  constructor(private http:HttpClient) { }

   getPlaces(inputs:string):Observable<Datas[]>{
    return  this.http.get<RootObject>(`${this.PLACE_BASE_URL}/cities?minPopulation=10000&namePrefix=${inputs}`,{
      headers:{
        "X-RapidAPI-Key":"12fb8ea0b5mshac2ac85041f834dp192b3ejsndc50077080da",
        "X-RapidAPI-Host":"wft-geo-db.p.rapidapi.com"
      }
    }).pipe(map(root=>{
      return root.data
    }))
  }

  getCurrentWeatherData(lat:any,lon:any):Observable<IWeather>{
    return this.http.get<IWeather>(`${this.WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`)
  }

  getForecast(lat:any,lon:any):Observable<List[]>{
    return this.http.get<Rootforecast>(`${this.WEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`).pipe(map(val=>{
      return val.list
    }))
  }


}
