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
    { title: 'Level1', url: '/level1', icon: 'home'},
    { title: 'Level2', url: '/level2', icon: 'home'},
    { title: 'Level3', url: '/level3', icon: 'home'},
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private navCtrl:NavController) {}
  
  async ngOnInit() {
    this.navCtrl.navigateRoot(['home']);
  }
  
  getdirection(index){
    return 'root';
  }

}
