import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { List } from 'src/app/model/forcast';
import { Datas, } from 'src/app/model/rapidPlace';
import { IWeather } from 'src/app/model/weather';
import { PlaceAndWeatherService } from 'src/app/services/place-and-weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  $places!: Observable<Datas[]>;
  searchInput!: string;
  $current!:Observable<IWeather>
  $forcast!:Observable<List[]>
  forcastTime!:List[]
  nextDays!:List[]
  $currentForecast!:any
  today = new Date()
  $input = new Subject<string>()

  constructor(private service: PlaceAndWeatherService, private datePipe:DatePipe) {
    this.$input.pipe(debounceTime(600),
    distinctUntilChanged()).subscribe(val=>{
    this.search(val)
    this.searchInput = val
    })
  }

  search(input:string) {
   this.$places =  this.service.getPlaces(input)
  }

  passPlace(item:Datas | any ){
    this.searchInput = item.name
    this.$places = new Observable<Datas[]>
    this.$current = this.service.getCurrentWeatherData(item.latitude,item.longitude)
    this.$forcast = this.service.getForecast(item.latitude,item.longitude)
    this.$forcast.subscribe(res=>{
      this.forcastTime = res.filter(val => {
      return this.datePipe.transform(val.dt_txt,'MM yyyy dd') == this.datePipe.transform(this.today,'MM yyyy dd')
        // return a==b
      })
    })

    this.$forcast.subscribe(res=>{
      this.nextDays = res.filter(val=>{
        let c = this.datePipe.transform(val.dt_txt,'HH')
        return c == '12'
      })
    })
  }


  myLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(loc=>{
      this.passPlace(loc.coords)
      })
    }
    else{alert('Your system rejected this request')}
  }





}
