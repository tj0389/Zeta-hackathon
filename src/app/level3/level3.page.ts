import { ActivatedRoute } from '@angular/router';
import { NavController, MenuController, AlertController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../providers/shared-data/shared-data.service';

@Component({
  selector: 'app-level3',
  templateUrl: './level3.page.html',
  styleUrls: ['./level3.page.scss'],
})

export class Level3Page implements OnInit {

  id:number;
  cardnumber;
  cvv;
  upiid;
  amount;
  otp;

  constructor(public shared: SharedDataService,public navCtrl:NavController,private activatedRoute:ActivatedRoute,private menuCtrl:MenuController,public alertCtrl:AlertController,public loadingCtrl:LoadingController) {

    this.shared.otptime=this.shared.otp_time;

    this.id=JSON.parse(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.id==undefined || this.id==null)
      this.id=0;
    else
      this.id+=1;
  }

  ngOnInit() {
  }
  
  nextpage(id:number){
    if (id==0){
      if (this.shared.current_level<3){
        this.alertCtrl.create({
          header : `Alert!`,
          message : `Level 2 is not completed`,
        }).then(async (alert)=>{
          alert.present();
          await this.shared.delay(2000);
          alert.dismiss();
        })
      }
      else
        this.navCtrl.navigateForward(['level3',{id:id}]);
    }
    else if (id==1){
      this.setTime();
      this.sendotp();
      this.menuCtrl.enable(false);
      this.navCtrl.navigateRoot(['level3',{id:id}]);
    }
    else
      this.navCtrl.navigateForward(['level3',{id:id}]);
  }

  isempty(){
    if (this.upiid==null || this.upiid==undefined || this.upiid=='')
      return true;
    if (this.amount==null || this.amount==undefined || this.amount=='')
      return true;
    return false;
  }

  sendotp(){
    let val=Math.floor(100000 + Math.random() * 900000);
  }
  
  async setTime(){
    while(this.shared.otptime>0){
      await this.shared.delay(1000);
      this.shared.otptime=this.shared.otptime-1;
    }
  }
  
  async checkOTP() {
    this.menuCtrl.enable(true);
    this.shared.current_level=Math.max(this.shared.current_level,4);
    this.shared.is_transaction_complete=true;
    this.shared.savescore(1);
    this.navCtrl.navigateRoot('home');
  }
  
  cancel(){
    this.alertCtrl.create({
      header : 'Alert!',
      message :`Are you sure, your current transaction will be cancelled`,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.canceltransaction();
          }
        },'NO'
      ]
    }).then(async (alert)=>{
      alert.present();
    })
  }
  
  canceltransaction(){
    this.shared.otptime=this.shared.otp_time;
    this.navCtrl.navigateRoot('level3');
    this.shared.is_transaction_complete=false;
    this.shared.savescore(1);
  }
}
