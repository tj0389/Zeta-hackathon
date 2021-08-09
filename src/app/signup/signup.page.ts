import { GlobalVarsService } from './../providers/global-vars/global-vars.service';
import { AuthService } from './../providers/auth/auth.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  loading: any;

  constructor(private navCtrl: NavController,private authService:AuthService,public alertCtrl:AlertController,public loadingCtrl:LoadingController) { }

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

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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
        await this.delay(2000);
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
          await this.delay(2000);
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
          await this.delay(2000);
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
          await this.delay(2000);
          alert.dismiss();
        })
      }
      if (flag==1){
        this.signin();
      }
    }
    // this.signin();
  }
  
  signin(){
    let data = { firstName: this.firstName,lastName: this.lastName,email: this.email,mobile:this.mobile,userType: this.userType,password: this.password,childrenId: this.child};
    this.showLoader();
    this.authService.postData(data, 'registerUser').then(async (result) => {
      console.log(result);
      await this.loading.dismiss();
      if (result['status'] == 'success') {
        result['data'].forEach((value,key) => {
          localStorage.setItem(key,value);
        });
        this.navCtrl.navigateRoot('login');
      }
      else
      {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: result['msg'],
          buttons: ['OK'],
        });
        await alert.present();
        await this.delay(2000);
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
      await this.delay(2000);
      alert.dismiss();
    });
  }
  
  async showLoader(){
    this.loading = await this.loadingCtrl.create({
        message: 'Loading..',
        duration: 10000,
    });
    await this.loading.present();
  }
  
  changerole(type){
    if (this.userType!=type)
      this.flag=!this.flag
    this.userType=type;
  }
}
