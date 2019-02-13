import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  // setting data in localstorage
  setItem(key: any,value: any) {
    localStorage.setItem(key,JSON.stringify(value));
  }
  // getting data from localstorage
  getItem(key: any) {
    return JSON.parse(localStorage.getItem(key));
  }
}
