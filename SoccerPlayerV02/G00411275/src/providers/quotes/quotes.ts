import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

/*
  Generated class for the QuotesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuotesProvider {

  constructor(public http: HttpClient) {
  }

  getQuotes(): Observable<any> {
    return this.http.get("https://api.quotable.io/random")
  }

}
