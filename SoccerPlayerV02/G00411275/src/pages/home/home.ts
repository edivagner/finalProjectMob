import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuotesProvider } from "../../providers/quotes/quotes";
import { SettingsPage } from '../settings/settings';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  author: string;
  content: string;
  tags: string[];

  myCountryID: number;
  messageHome: string;
  readStorage: Promise<{}>;
  countryName: string;
  flagImage: string;
  flag: any;

  constructor(public navCtrl: NavController, private qt: QuotesProvider, private storage: Storage) {

  }

  ionViewDidLoad() {
    this.qt.getQuotes().subscribe(data => {
      this.author = data.author;
      this.tags = data.tags;
      this.content = data.content;
    });


    this.storage.get("countryID")
      .then((val) => {

        this.myCountryID = val;
        if (!val) {
          this.messageHome = "CountryID doesn't exist";
        }
      })
  }

  ionViewDidEnter() {
    this.storage.get("countryID")
      .then((val) => {
        console.log("val >>> " + val)
        this.myCountryID = val;
        if (val > 132 || val <= 0) {
          this.messageHome = "CountryID " + this.myCountryID + " doesn't exist";
        } else if (this.myCountryID > 0) {
          this.storage.get("countryName")
            .then((val) => {
              console.log("val >>> " + val)
              this.countryName = val;
              this.messageHome = "CountryID " + this.myCountryID + " is " + val;
              this.getFlag();
            })
            .catch((error) => {
              alert("Error acessing Storage")
            });
        }
      })
      .catch((error) => {
        alert("Error acessing Storage")
      })
  }

  clickSettings() {
    this.navCtrl.push(SettingsPage);
  }

  getFlag() {
    this.storage.get("countryCode")
      .then((value) => {
        this.flag = value;
      });
    this.flagImage = "https://flagsapi.com/" + this.flag + "/shiny/64.png";
    console.log(this.flagImage);
  }

}



