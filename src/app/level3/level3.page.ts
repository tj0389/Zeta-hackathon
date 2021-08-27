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
  loading: HTMLIonLoadingElement;

  constructor(public shared: SharedDataService,public navCtrl:NavController,private activatedRoute:ActivatedRoute,private menuCtrl:MenuController,public alertCtrl:AlertController,public loadingCtrl:LoadingController,private authService:AuthService) {

    this.shared.otptime=this.shared.otp_time;

    this.id=JSON.parse(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.id==undefined || this.id==null)
      this.id=0;
    else
      this.id+=1;

    if (shared.individualID=='')
      navCtrl.navigateRoot(['level3',{id:1}])
  }

  ngOnInit() {
  }
  
  nextpage(id:number){
    if (id==1){
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
    this.issueBundels();
  }
  
  createAccountHolder(){
      let val=Math.floor(10000 + Math.random() * 90000);
      console.log(this.shared.user);
      let data = {
        "AUTH_TYPE": "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidGFnIjoiQS10WEJzbmc3MzFCbzdXX3VmTHFRdyIsImFsZyI6IkExMjhHQ01LVyIsIml2IjoibGtRN2l0Ukc3c1FIOWpwbyJ9.cqOfj-TsUgQwSjx2ch3ySm0ph44IQviWqVTfSAPN-A8.7rR5lMRvjRLKq_2hi158gw.H040En8DSMegkWH16maCRSleNW-ZpmGXFVUjZUgT9iuAYPRNlEIzjU1hCk1bnT18ic34tMVkeMMAiskJgOTyeA-627V_5C-y8xGIoSF6c5P9tEsu1cURX55EmFl5A4OAYb3xHJNYpueeWSsTMkyk60fg7ZA1ATr74B0QzEo1zKnjzZxQoZHYayWKlFmi-LSYic3lnDFgV35WEjveSzzPyOZQprTkDh5ee21QbJkER2lZWv5KqQge1ViOhi1UPWa1OjtJyAQGv86W17EQ2wA0_ESFUg3-kahwfhhr5_PxtWc_P698vQ-fFiXL0Qvra_-6erzJcvy4ghUanp5k2xUNkR-nC_tX3lLqvAqL3Ad_PqdDdOPcGdd0qHPSJBDf6lB1.IKEnNxngSfQRGEunXf6b8w",
        "requestCallType": "POST",
        "url": "https://fusion.preprod.zeta.in/api/v1/ifi/140793/applications/newIndividual",
        "ifiID": "140793",
        "formID": "Caption-111111",
        "applicationType": "CREATE_ACCOUNT_HOLDER",
        "spoolID": "3deb5a70-311c-11ea-978f-2e728ce88125",
        "individualType": "REAL",
        "salutation": "",
        "firstName": 'Sarthak',
        "middleName": "",
        "lastName": 'Jain',
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
                "PAN": "NNZAA2318A"
            },
            "authType": "PAN"
        },
        "vectors": [
            {
                "type": "p",
                "value": "+919027765985",
                "isVerified": true
            }
        ],
        "pops": [],
        "customFields": {
          "entity_id": "ABCD0001"
        }
      }
      this.showLoader();
      this.authService.postData(data, 'hitZetaAPI').then(async (result) => {
        await this.loading.dismiss();
        console.log(result);
        if (result['status']=='APPROVED'){
          this.shared.user.individualID=result['individualID'];
          // this.issueBundels();
        }
        else{
          const alert = await this.alertCtrl.create({
            header: result['status'],
            message: result['statusDetails']['message'],
            buttons: ['OK'],
          });
          await alert.present();
        }
      }, async (err) => {
        await this.loading.dismiss();
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
    // account-id:'4d45a6fe-0048-4cda-bcb0-8d3cc35ed21a'
    //resource-id:'"945f4865-f0eb-477d-929d-da583cc0439f"
    let data={
      "AUTH_TYPE": "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidGFnIjoiQS10WEJzbmc3MzFCbzdXX3VmTHFRdyIsImFsZyI6IkExMjhHQ01LVyIsIml2IjoibGtRN2l0Ukc3c1FIOWpwbyJ9.cqOfj-TsUgQwSjx2ch3ySm0ph44IQviWqVTfSAPN-A8.7rR5lMRvjRLKq_2hi158gw.H040En8DSMegkWH16maCRSleNW-ZpmGXFVUjZUgT9iuAYPRNlEIzjU1hCk1bnT18ic34tMVkeMMAiskJgOTyeA-627V_5C-y8xGIoSF6c5P9tEsu1cURX55EmFl5A4OAYb3xHJNYpueeWSsTMkyk60fg7ZA1ATr74B0QzEo1zKnjzZxQoZHYayWKlFmi-LSYic3lnDFgV35WEjveSzzPyOZQprTkDh5ee21QbJkER2lZWv5KqQge1ViOhi1UPWa1OjtJyAQGv86W17EQ2wA0_ESFUg3-kahwfhhr5_PxtWc_P698vQ-fFiXL0Qvra_-6erzJcvy4ghUanp5k2xUNkR-nC_tX3lLqvAqL3Ad_PqdDdOPcGdd0qHPSJBDf6lB1.IKEnNxngSfQRGEunXf6b8w",
      "requestCallType": "POST",
      "url": "https://fusion.preprod.zeta.in/api/v1/ifi/140793/bundles/20c6dcd0-7728-436f-b082-0a0e60baf303/issueBundle",
        "accountHolderID":'cfaef7b3-565c-46b8-86ff-7625cace86e9',  // individual id
        "name": this.shared.user.firstName,
        "phoneNumber":"+91"+String(this.shared.user.mobile)  // unique
    }
    this.showLoader();
    this.authService.postData(data, 'hitZetaAPI').then(async (result) => {
      await this.loading.dismiss();
      console.log(result);
      if (result['accounts']!=undefined && result['paymentInstruments']!=undefined){
        this.shared.user.accountID=result['accounts'][0]['accountID'];
        this.shared.user.resourceID=result['paymentInstruments'][0]['resourceID'];
        this.addmoney();
      }
      else{
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Something went wrong. Try again later',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }, async (err) => {
      await this.loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Something went wrong. Try again later',
        buttons: ['OK'],
      });
      await alert.present();
    });
  }

  addmoney(){
    let val=Math.floor(10000 + Math.random() * 90000);
    let data={
      "AUTH_TYPE": "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidGFnIjoiQS10WEJzbmc3MzFCbzdXX3VmTHFRdyIsImFsZyI6IkExMjhHQ01LVyIsIml2IjoibGtRN2l0Ukc3c1FIOWpwbyJ9.cqOfj-TsUgQwSjx2ch3ySm0ph44IQviWqVTfSAPN-A8.7rR5lMRvjRLKq_2hi158gw.H040En8DSMegkWH16maCRSleNW-ZpmGXFVUjZUgT9iuAYPRNlEIzjU1hCk1bnT18ic34tMVkeMMAiskJgOTyeA-627V_5C-y8xGIoSF6c5P9tEsu1cURX55EmFl5A4OAYb3xHJNYpueeWSsTMkyk60fg7ZA1ATr74B0QzEo1zKnjzZxQoZHYayWKlFmi-LSYic3lnDFgV35WEjveSzzPyOZQprTkDh5ee21QbJkER2lZWv5KqQge1ViOhi1UPWa1OjtJyAQGv86W17EQ2wA0_ESFUg3-kahwfhhr5_PxtWc_P698vQ-fFiXL0Qvra_-6erzJcvy4ghUanp5k2xUNkR-nC_tX3lLqvAqL3Ad_PqdDdOPcGdd0qHPSJBDf6lB1.IKEnNxngSfQRGEunXf6b8w",
      "requestCallType": "POST",
      "url": "https://fusion.preprod.zeta.in/api/v1/ifi/140793/transfers",
      "requestID" : val,
      "amount": {
          "currency" : "INR",
          "amount" : "100"
      },
      "transferCode": "ATLAS_P2M_AUTH",
      "debitAccountID": "a27bce72-467e-463f-86cf-2e90b9baa3da",
      "creditAccountID": this.shared.user.accountID,
      "transferTime": 1574741608001,
      "remarks": "AH-1 VBO  a/c",
      "attributes": {}
    }
    this.showLoader();
    this.authService.postData(data, 'hitZetaAPI').then(async (result) => {
      await this.loading.dismiss();
      console.log(result);
      if (result['status']=='SUCCESS'){
        this.shared.savescore(1);
        this.nextpage(0);
      }
      else{
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Something went wrong. Try again later',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }, async (err) => {
      await this.loading.dismiss();
      console.log(err);
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Something went wrong. Try again later',
        buttons: ['OK'],
      });
      await alert.present();
    });
  }

  async showLoader(){
    this.loading = await this.loadingCtrl.create({
        message: 'Loading..',
    });
    await this.loading.present();
  }

  
}
