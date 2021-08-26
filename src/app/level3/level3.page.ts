import { AuthService } from './../providers/auth/auth.service';
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

  constructor(public shared: SharedDataService,public navCtrl:NavController,private activatedRoute:ActivatedRoute,private menuCtrl:MenuController,public alertCtrl:AlertController,public loadingCtrl:LoadingController,private authService:AuthService) {

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

  setup(){
   this.createAccountHolder();
   this.issueBundels();
  }
  
  createAccountHolder(){
    let data={
      "ifiID": "140793",
      "formID": "Caption-12345",
      "applicationType": "CREATE_ACCOUNT_HOLDER",
      "spoolID": "3deb5a70-311c-11ea-978f-2e728ce88125",
      "individualType": "REAL",
      "salutation": "",
      "firstName": "<<Firstname>",
      "middleName": "",
      "lastName": "<<lastname>>",
      "profilePicURL": "",
      "dob": {
          "year": 1985,
          "month": 11,
          "day": 20
      },
      "gender": "",
      "mothersMaidenName": "",
      "kycDetails": {
          "kycStatus": "MINIMAL",
          "kycStatusPostExpiry": "KYC_EXPIRED",
          "kycAttributes": {},
          "authData": {
              "PAN": "<<pan number>>"
          },
          "authType": "PAN"
      },
      "vectors": [
          {
              "type": "p",
              "value": "+91<<mobilenumber>>",
              "isVerified": true
          }
      ],
      "pops": [],
      "customFields": {
        "entity_id": "ABCD0001"
      }
    }
    // this.authService.getzetaapi('resources/461c368b-00eb-46ec-9321-a0c29598ed7a')
    this.authService.postzataapi(JSON.stringify(data),'applications/newIndividual').then(async (result) => {
      console.log(result);
      // await this.loading.dismiss();
      // individual ID 
      
    },async (err) => {
      // await this.loading.dismiss();
      console.log(err);
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Something went wrong. Try again later',
        buttons: ['OK'],
      });
      await alert.present();
    });

  }

  issueBundels(){
    let data={
        "accountHolderID": "8f481b75-afff-4ef2-ab9b-97b3e08fb17c",  // individual id
        "name": "VBO_bundle_02",
        "phoneNumber": "+919843543890"         // unique
    }
    // this.authService.getzetaapi('resources/461c368b-00eb-46ec-9321-a0c29598ed7a')
    this.authService.postzataapi(data,'bundles/20c6dcd0-7728-436f-b082-0a0e60baf303/issueBundle').then(async (result) => {
      console.log(result);
      // await this.loading.dismiss();
      
    },async (err) => {
      // await this.loading.dismiss();
      console.log(err);
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Something went wrong. Try again later',
        buttons: ['OK'],
      });
      await alert.present();
    });
  }
}
