import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SportProvider } from '../../providers/sport/sport';
import { Storage } from "@ionic/storage";

/**
 * Generated class for the PlayersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-players',
  templateUrl: 'players.html',
})
export class PlayersPage {

  myCountryID: number;
  myMaxAge: number;
  myMinAge: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sp: SportProvider, private storage: Storage) {
    /*
        this.storage.get("myCountryID")
          .then((val) => {
            console.log("@ myCountryID @ >>> " + val)
            this.myCountryID = val;
          });
    
        this.storage.get("maxAge")
              .then((val) => {
                console.log("@ myMaxAge @ >>> " + val)
                this.myMaxAge = val;
                console.log("@ myMaxAge @ @>>> " + this.myMaxAge)
              });

            this.storage.get("minAge")
              .then((val) => {
                console.log("@ minAge @ >>> " + val)
                this.myMinAge = val;
                console.log("@ myMinAge @ @>>> " + this.myMinAge)
              });
    
        this.sp.getPlayers(this.myCountryID, this.myMinAge, this.myMaxAge).subscribe(data => {
          console.log(data);
        });
    */
    // this.myCountryID = this.hp.myCountry_id;
    // console.log(this.myCountryID + "@");

    this.sp.getPlayers().subscribe(data => {
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad A');
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter B');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter C');
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave D');
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave E');
  }
  ionViewWillUnload() {
    console.log('ionViewWillUnload F');
  }
  ionViewCanEnter() {
    console.log('ionViewCanEnter G');
  }

}
