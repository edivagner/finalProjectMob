import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuotesProvider } from "../../providers/quotes/quotes";
import { SettingsPage } from "../settings/settings";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  author: string;
  content: string;
  tags: string[];

  constructor(public navCtrl: NavController, private qt: QuotesProvider) {

  }

  ionViewDidLoad() {
    this.qt.getQuotes().subscribe(data => {
      this.author = data.author;
      this.tags = data.tags;
      this.content = data.content;
    });
  }

  clickSettings() {
    this.navCtrl.push(SettingsPage);
  }

}
