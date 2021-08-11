import { ActivatedRoute } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
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

  constructor(public shared: SharedDataService,public navCtrl:NavController,private activatedRoute:ActivatedRoute,private menuCtrl:MenuController) {

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
    if (id==1){
      this.setTime();
      this.sendotp();
      this.menuCtrl.enable(false);
      this.navCtrl.navigateRoot(['level3',{id:id}]);
    }
    else
      this.navCtrl.navigateForward(['level3',{id:id}]);
  }

  sendotp(){
    console.log('sending');
  }

  async setTime(){
    while(this.shared.otptime>0){
      await this.shared.delay(1000);
      this.shared.otptime=this.shared.otptime-1;
    }
  }
  
  checkOTP() {
    console.log("Verifying transaction!!");
    this.menuCtrl.enable(true);
    this.navCtrl.navigateRoot('home');
    //this.currentView = this.inputOTP;
  }
  
}
