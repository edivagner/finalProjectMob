import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { SportProvider } from "../../providers/sport/sport";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  countryID: number;
  minAge: number;
  maxAge: number;

  myCountryID: number;
  myMinAge: number;
  myMaxAge: number;

  dataGetCountry: any[];
  countryName: string;

  dataGet: any[];
  sortDirection = 0;
  sortKey = null;
  countryCode: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private storage: Storage, private sp: SportProvider) {
    //this.loadData();
  }

  showAlert() {
    const urlName = window.location.href; //ionic get actual url
    const split_url = urlName.split('/');
    const alert = this.alertCtrl.create({
      title: split_url[2] + " says",
      subTitle: 'Please enter a Country ID',
      buttons: ['OK']
    });
    alert.present();
  }

  save() {
    if (!this.countryID) {
      this.showAlert();
    } else {
      this.myCountryID = this.countryID;
      this.countryID = null;
      this.myMaxAge = this.maxAge;
      this.maxAge = null;
      this.myMinAge = this.minAge;
      this.minAge = null;

      this.getCountryName(this.myCountryID);

      this.storage.set("countryID", this.myCountryID);
      this.storage.set("maxAge", this.myMaxAge);
      this.storage.set("minAge", this.myMinAge);

      console.log(this.myCountryID);
      this.navCtrl.pop();
    }
  }
  cancel() {
    this.countryID = null;
    this.maxAge = null;
    this.minAge = null;
  }

  getCountryName(myCountryID: number) {
    this.sp.getCountrybyId(myCountryID).subscribe(dataCountry => {
      console.log(dataCountry);
      this.dataGetCountry = dataCountry.data;
      this.countryName = dataCountry.data.name;
      this.countryCode = dataCountry.data.country_code;
      this.storage.set("countryName", this.countryName);
      this.storage.set("countryCode", this.countryCode.toUpperCase());
      console.log(this.countryName);
    });
  }

  loadData() {
    this.sp.getCountries().subscribe(dataSP => {
      this.dataGet = dataSP.data;
      var count = Object.keys(dataSP.data).length;
      this.sort();
      console.log(count);
      console.log(this.dataGet);
    })

  }

  sortBy(key: any) {
    this.sortKey = key;
    this.sortDirection++;
    this.sort();
  }

  sort() {
    if (this.sortDirection == 1) {
      this.dataGet.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valA.localeCompare(valB);
      });
    } else if (this.sortDirection == 2) {
      this.dataGet.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valB.localeCompare(valA);
      });
    } else {
      this.sortDirection = 0;
      this.sortKey = null;
    }
  }

}
