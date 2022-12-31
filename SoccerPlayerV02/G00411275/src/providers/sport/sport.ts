import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from "@ionic/storage";

/*
  Generated class for the SportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SportProvider {

  apiSportKey: string = "cb4eaab0-7884-11ed-aa9d-ff7480295f6d";

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello SportProvider Provider');
  }

  getCountries(): Observable<any> {
    return this.http.get(`https://app.sportdataapi.com/api/v1/soccer/countries?apikey=${this.apiSportKey}`,);
  }

  getCountrybyId(myCountryID: any): Observable<any> {
    return this.http.get(`https://app.sportdataapi.com/api/v1/soccer/countries/${myCountryID}?apikey=${this.apiSportKey}`);
  }
}
