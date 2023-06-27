import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  $IsLoading = new BehaviorSubject<boolean>(false)

  showLoading(){
    this.$IsLoading.next(true)
  }

  hideLoading(){
    this.$IsLoading.next(false)
  }

}
