import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../providers/shared-data/shared-data.service';
import { RestCallService } from '../rest-call.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email;
  password;
  loading: HTMLIonLoadingElement;

  constructor(private navCtrl: NavController,private authService:AuthService,public alertCtrl:AlertController,public loadingCtrl:LoadingController) {
    this.email=localStorage.getItem('email');
    this.password=localStorage.getItem('password');
  }
  email: string = "";
  password: string = "";

  constructor(private navCtrl: NavController, private restCallService: RestCallService) { }

  ngOnInit() {
  }
  
  async logIn() {
    // let val=localStorage.getItem('email');
    // if (val==null || val==undefined || val==''){
    //   const alert = await this.alertCtrl.create({
    //   header: 'Alert!',
    //   message: 'Please Signup First',
    //   buttons:  [{
    //     text: 'Sign Up',
    //     handler: () => {
    //       this.navCtrl.navigateRoot('signup');
    //     }
    //   }]});
    //   await alert.present();
    //   setTimeout(()=>{},2000);
    //   alert.dismiss();
    // }
    // else{

    // }

    let data = {email: this.email,password: this.password};
    this.showLoader();
    this.authService.postData(data, 'verifyUser').then(async (result) => {
      console.log(result);
      await this.loading.dismiss();
      if (result['status'] == 'success') {
        result['data'].forEach((value,key) => {
        localStorage.setItem(key,value);
        });
        this.navCtrl.navigateRoot('home');
      }
      else{
        const alert = await this.alertCtrl.create({
        header: 'Error',
        message: result['msg'],
        buttons: ['OK'],
        });
        await alert.present();
        setTimeout(()=>{},2000);
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
      await alert.present();
      setTimeout(()=>{},2000);
      alert.dismiss();
    });
    var data: any, res: any;
    data = {
      "email": this.email,
      "password": this.password,
    };
    console.log("Request is ", data);
    res = this.restCallService.postData(data, "verifyUser");
    console.log(res); 

  }

  signUp() {
    this.navCtrl.navigateRoot('signup');
  }

  async showLoader(){
    this.loading = await this.loadingCtrl.create({
        message: 'Loading..',
        duration: 10000,
    });
    await this.loading.present();
  }

}
