import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home'},
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private navCtrl:NavController) {}

  async ngOnInit() {
    this.navCtrl.navigateRoot(['home']);
  }
}
