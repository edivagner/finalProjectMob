import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from "@ionic/storage";

/*
  Generated class for the SportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SportProvider {

  apiSportKey: string = "3e694bc0-79b3-11ed-8fe3-7f3103d38478";

  resultSportCountries: any = [];
  myCountry_id: any;
  max_age: any;
  min_age: any;
  dataArray: any[];

  constructor(public http: HttpClient, private storage: Storage) {
    this.storage.get("myCountryID")
      .then((val) => {
        console.log("@ myCountryID @ >>> " + val)
        this.myCountry_id = val;
        console.log("@ myCountryID @ @ >>> " + this.myCountry_id)
      });

    this.storage.get("maxAge")
      .then((val) => {
        console.log("@ myMaxAge @ >>> " + val)
        this.max_age = val;
        console.log("@ myMaxAge @ @>>> " + this.max_age)
      });

    this.storage.get("minAge")
      .then((val) => {
        console.log("@ minAge @ >>> " + val)
        this.min_age = val;
        console.log("@ myMinAge @ @>>> " + this.min_age)
      });
  }

  getCountries(): Observable<any> {
    var url = `https://app.sportdataapi.com/api/v1/soccer/countries?apikey=${this.apiSportKey}`;
    return this.http.get(url);
  }



  getPlayers(): Observable<any> {


    var url = `https://app.sportdataapi.com/api/v1/soccer/players?apikey=${this.apiSportKey}&country_id=${this.myCountry_id}&min_age=${this.min_age}&max_age=${this.max_age}`;

    console.log(url);

    return this.http.get(url);
  }


}
