import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

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
  minAge: number;
  maxAge: number;
  countryID: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private storage: Storage) {
  }

  ionViewDidLoad() {
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
    if (this.countryID == null) {
      this.showAlert();
    } else {
      this.storage.set("countryID", this.countryID);
      this.storage.set("maxAge", this.maxAge);
      this.storage.set("minAge", this.minAge);

      this.navCtrl.pop();
    }

  }
  cancel() {
    this.storage.remove("countryID");
    this.storage.remove("maxAge");
    this.storage.remove("minAge");

    this.navCtrl.pop();
  }

}
