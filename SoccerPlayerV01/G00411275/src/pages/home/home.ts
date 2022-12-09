import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuotesProvider } from "../../providers/quotes/quotes";
import { ThemeModeProvider } from '../../providers/theme-mode/theme-mode';
import { SettingsPage } from "../settings/settings";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  author: string;
  content: string;
  tags: string[];

  // statusTheme: boolean;


  selectedTheme: String;

  constructor(public navCtrl: NavController, private qt: QuotesProvider, private setTheme: ThemeModeProvider) {
    this.setTheme.getActiveTheme().subscribe(val => this.selectedTheme = val);

  }

  ionViewDidLoad() {
    this.qt.getQuotes().subscribe(data => {
      this.author = data.author;
      this.tags = data.tags;
      this.content = data.content;
    });
    console.log(">> " + this.statusTheme);
  }

  clickSettings() {
    this.navCtrl.push(SettingsPage);
  }

  toggleAppTheme() {
    console.log("hi theme!")

    if (this.selectedTheme === 'dark-theme') {
      this.setTheme.setActiveTheme('light-theme');
    } else {
      this.setTheme.setActiveTheme('dark-theme');
    }
  }

  /*
  toggleAppTheme() {
    console.log("hi theme!")
    if (this.selectedTheme === 'dark-theme') {
      this.setTheme.setActiveTheme('light-theme');
    } else {
      this.setTheme.setActiveTheme('dark-theme');
    }
  }
  */



}
