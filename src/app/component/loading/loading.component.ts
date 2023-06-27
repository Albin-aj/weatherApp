import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { PlaceAndWeatherService } from 'src/app/services/place-and-weather.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  isLoading!:any

  constructor(private loadService:LoadingService){
    this.loadService.$IsLoading.subscribe(res=>{
      this.isLoading = res
    })
  }

}
