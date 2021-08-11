import { GlobalVarsService } from './../providers/global-vars/global-vars.service';
import { NavController, AlertController, LoadingController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth/auth.service';
import { SharedDataService } from '../providers/shared-data/shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email;
  password;
  loading: HTMLIonLoadingElement;

  constructor(private navCtrl: NavController,private authService:AuthService,public alertCtrl:AlertController,public    loadingCtrl:LoadingController,public shared:SharedDataService,public menuCtrl:MenuController) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  isEmpty(){
    if (this.email==null || this.email==undefined || this.email=='')
      return true;
    if (this.password==null || this.password==undefined || this.password=='')
      return true;
    return false;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  
  async logIn() {
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
      let is_valid_email=GlobalVarsService.check_email(this.email);
      if (!is_valid_email){
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Please Enter correct Email',
          buttons: ['OK'],
          });
          await alert.present();
      }
      else{
        let data = {email: this.email,password: this.password};
        this.showLoader();
        this.authService.postData(data, 'verifyUser').then(async (result) => {
          console.log(result);
          await this.loading.dismiss();
          if (result['status'] == 'success') {
            let keys=Object.keys(result['data']);
            keys.forEach((key, index) => {
              localStorage.setItem(key,result['data'][key]);
            });
            this.shared.savedata();
            this.menuCtrl.enable(true);
            this.navCtrl.navigateRoot('home');
            console.log(this.shared.user);
          }
          else{
            const alert = await this.alertCtrl.create({
            header: 'Error',
            message: result['message'],
            buttons: ['OK'],
            });
            await alert.present();
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
        });
      }
    }
  }
  
  signUp() {
    this.navCtrl.navigateRoot('signup');
  }

  async showLoader(){
    this.loading = await this.loadingCtrl.create({
        message: 'Loading..',
        duration: 20000,
    });
    await this.loading.present();
  }

}
