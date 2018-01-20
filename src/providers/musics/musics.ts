import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MusicsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const API: string = "https://raw.githubusercontent.com/CsgeeksYoutube/ionic-music-app-data-file/9e78112db13bd826136aebfeba062e99de17a690/New%20Text%20Document.json"; //create a constant (type string) get API
@Injectable()
export class MusicsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MusicsProvider Provider');
  }

  getMusic(){
    return this.http.get<any[]>(API); //pass API here
  }

}
