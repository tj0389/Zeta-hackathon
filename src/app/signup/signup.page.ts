import { GlobalVarsService } from './../providers/global-vars/global-vars.service';
import { AuthService } from './../providers/auth/auth.service';
import { AlertController, LoadingController, NavController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../providers/shared-data/shared-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  loading: any;

  constructor(private navCtrl: NavController,private authService:AuthService,public alertCtrl:AlertController,public loadingCtrl:LoadingController,public shared:SharedDataService,public menuCtrl:MenuController) { 
    this.menuCtrl.enable(false);
  }

  firstName: string;
  lastName: string;
  email;
  mobile;
  password;
  confirm_password;
  child;
  flag:boolean=false;
  userType:number=2;
  
  ngOnInit() {
  }

  isEmpty(){
    if (this.firstName==null || this.firstName==undefined || this.firstName=='')
      return true;
    if (this.lastName==null || this.lastName==undefined || this.lastName=='')
      return true;
    if (this.email==null || this.email==undefined || this.email=='')
      return true;
    if (this.mobile==null || this.mobile==undefined)
      return true;
    if (this.userType==null || this.userType==undefined)
      return true;
    if (this.password==null || this.password==undefined || this.password=='')
      return true;
    if (this.confirm_password==null || this.confirm_password==undefined || this.confirm_password=='')
      return true;
    return false;
  }

  signUp() {
    // first validate input data
    if (this.isEmpty()){
      this.alertCtrl.create({
        header : 'Error',
        message : `Marked Data Fields can't be Empty`,
        buttons: ['Ok']
      }).then(async (alert)=>{
        alert.present();
        await this.shared.delay(2000);
        alert.dismiss();
      })
    }
    else{
      let is_valid_mail=GlobalVarsService.check_email(this.email);
      let is_valid_mobile=GlobalVarsService.check_mobile_number(this.mobile);
      let flag=1;
      if (!is_valid_mobile){
        flag=0;
        this.alertCtrl.create({
          header : 'Error',
          message : `Mobile Number is Not Valid`,
          buttons: ['Ok']
        }).then(async (alert)=>{
          alert.present();
          await this.shared.delay(2000);
          alert.dismiss();
        })
      }
      else if (!is_valid_mail){
        flag=0;
        this.alertCtrl.create({
          header : 'Error',
          message : `Email is Not Valid`,
          buttons: ['Ok']
        }).then(async (alert)=>{
          alert.present();
          await this.shared.delay(2000);
          alert.dismiss();
        })
      }
      else if (this.password!=this.confirm_password){
        flag=0;
        this.alertCtrl.create({
          header : 'Error',
          message : `Password and Confirm Password don't match`,
          buttons: ['Ok']
        }).then(async (alert)=>{
          alert.present();
          await this.shared.delay(2000);
          alert.dismiss();
        })
      }
      if (flag==1){
        this.signin();
      }
    }
  }
  
  signin(){
    let arr=[];
    if (this.userType==1)
      arr=this.child.split(',');
    let data = { firstName: this.firstName,lastName: this.lastName,email: this.email,mobile:this.mobile,userType: this.userType,password: this.password,childrenId: arr};
    this.showLoader();
    this.authService.postData(data, 'registerUser').then(async (result) => {
      console.log(result);
      await this.loading.dismiss();
      if (result['status'] == 'success') {
        this.menuCtrl.enable(true);
        this.navCtrl.navigateRoot('login');
        console.log(this.shared.user);
      }
      else
      {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: result['message'],
          buttons: ['OK'],
        });
        await alert.present();
        await this.shared.delay(2000);
        alert.dismiss();
      }
    },async (err) => {
      await this.loading.dismiss();
      console.log(err);
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Something went wrong. Try again later',
        buttons: ['OK'],
      });
      this.password="";
      await alert.present();
      await this.shared.delay(2000);
      alert.dismiss();
    });
  }
  
  async showLoader(){
    this.loading = await this.loadingCtrl.create({
        message: 'Loading..',
        duration: 20000,
    });
    await this.loading.present();
    // console.log("Request is ", data);
    // res = this.restCallService.postData(data, "registerUser");
    // console.log(res); 
  }
  
  changerole(type){
    if (this.userType!=type)
      this.flag=!this.flag
    this.userType=type;
  }
}
