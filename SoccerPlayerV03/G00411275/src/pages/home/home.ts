import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuotesProvider } from '../../providers/quotes/quotes';
import { Storage } from "@ionic/storage";
import { Observable } from 'rxjs/Observable';
import { SettingsPage } from '../settings/settings';
import { SportProvider } from '../../providers/sport/sport';

interface CountryData {
  country_id: number,
  name: string,
  country_code: string,
  continent: string
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public countryData: CountryData[];

  quotes: Observable<any>;
  countrySP: Observable<any>;

  author: string;
  content: string;
  tags: string[];

  countryID: number;
  messageHome: string;
  dataGet: any[];
  count: number;

  myCountry_id: number;
  myName: string;
  myCountry_code: string;
  flag: any;
  flagImage: string;
  flagStatus: boolean = false;


  myMaxAge: number;
  myMinAge: number;


  constructor(public navCtrl: NavController,
    private qt: QuotesProvider,
    private storage: Storage,
    private sp: SportProvider) {

    //clean storage
    this.storage.remove("countryID");

    // get quotes
    this.quotes = this.qt.getQuotes();

    // get countries

    this.countrySP = this.sp.getCountries();


    this.storage.get("countryID")
      .then((val) => {
        console.log("val countryID >>> " + val)
        this.countryID = val;
        if (this.countryID == null) {
          this.messageHome = "CountryID doesn't exist";
        }
      });
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    this.quotes.subscribe(data => {
      this.author = data.author;
      this.tags = data.tags;
      this.content = data.content;
    });

    this.countrySP.subscribe(dataSP => {
      this.dataGet = dataSP.data;
      this.count = Object.keys(dataSP.data).length;
      this.countryData = this.dataGet;
    });

    this.storage.get("countryID")
      .then((val) => {
        this.myCountry_id = val;
        console.log("val countryID >>> " + this.myCountry_id);

        this.storage.set("myCountryID", this.myCountry_id);

        this.storage.remove("countryID");

        this.flagStatus = false;

        if (this.myCountry_id == null) {
          this.messageHome = "CountryID doesn't exist";
        } else {
          if (val > this.count || val <= 8) {
            this.messageHome = "CountryID " + this.myCountry_id + " doesn't exist";
          } else {
            this.flagStatus = true;
            var D = this.checkCountryID();
            this.myName = D[0].name;
            console.log(D[0].name);
            this.myCountry_code = (D[0].country_code).toUpperCase();
            console.log(D[0].country_id);

            this.getFlag();

            this.messageHome = "CountryID " + this.myCountry_id + " is " + this.myName + " (" + this.myCountry_code + ")";


          }
        }

      });
  }

  clickSettings() {
    this.navCtrl.push(SettingsPage);
  }

  checkCountryID() {
    return this.countryData.filter((countryData) => {
      return countryData.country_id == this.myCountry_id;
    })
  }

  getFlag() {
    this.flagImage = "https://flagsapi.com/" + this.myCountry_code + "/shiny/64.png";
    console.log(this.flagImage);
  }

}
