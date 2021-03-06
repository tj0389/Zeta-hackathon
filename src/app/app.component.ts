import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from './providers/shared-data/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {
  public appPages;
  
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  loading: HTMLIonLoadingElement;
  constructor(public navCtrl:NavController,public shared:SharedDataService,public alertCtrl:AlertController,public loadingCtrl:LoadingController) {
    if (this.shared.user.userType=='1'){
      this.appPages=[
        { title: 'Home', url: '/home', icon: 'home'},
      ];
    }
    else{
      this.appPages = [
        { title: 'My Profile', url: '/profile', icon: 'home'},
        { title: 'Home', url: '/home', icon: 'home'},
        { title: 'Level1', url: '/level1', icon: 'home'},
        { title: 'Level2', url: '/level2', icon: 'home'},
        { title: 'Level3', url: '/level3', icon: 'home'}
      ];
    }
  }
  
  async ngOnInit() {
    let val=localStorage.getItem('email');
    let usertype=localStorage.getItem('userType');
    console.log(val,usertype);
    if(val=='' || val==null || val==undefined)
      this.navCtrl.navigateRoot(['login']);
    else
    {
      this.navCtrl.navigateRoot(['home']);        
    }
  }
  
  async logout(){
    if (this.shared.user.userType=='2')
      await this.shared.savescore(0);
    localStorage.clear();
    this.shared.user['isLogin']=false;
    this.shared.user['firstName']='Guest';
    this.shared.user['lastName']='';
    this.shared.user['email']='';
    this.shared.user['userType']='';
    this.shared.user['mobile']=0;
    this.shared.user['childrenId']=[];
    this.shared.user['data']={'accountID':'','individualID':'','resourceID':''};
    this.navCtrl.navigateRoot(['login']);
    console.log(this.shared.user);
  }
  
  async showalert(){
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Please Login First',
      buttons: ['OK'],
    });
    await alert.present();
  }

}
