import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from "../home/home";

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
  dataInput: number[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
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

      console.log(this.myCountryID);

      this.navCtrl.push(HomePage);

    }
  }

  cancel() {
    this.countryID = null;
    this.maxAge = null;
    this.minAge = null;
  }

}

