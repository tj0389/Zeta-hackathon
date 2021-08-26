import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../providers/auth/auth.service';
import { GlobalVarsService } from '../providers/global-vars/global-vars.service';
import { SharedDataService } from '../providers/shared-data/shared-data.service';
// import {Chart} from 'chart.js'
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class homePage implements OnInit {
  public title: string;
  child_data;
  child=[];
  ch="";
  loading: any;
  flag:boolean=false;
  is_shown;
  progress;
  is_start;
  load = false;
  constructor(public authService:AuthService,private navCtrl:NavController,public shared:SharedDataService,public alertCtrl:AlertController,public loadingCtrl:LoadingController) {
    if (this.shared.user.userType=='2')
      this.shared.getscore();
    if (this.shared.user.userType=='1'){
      this.is_shown= new Array(this.shared.user.childrenId.length);
      this.is_shown.fill(0);
      this.is_start= new Array(this.shared.user.childrenId.length);
      this.is_start.fill(0);
      this.progress= new Array(this.shared.user.childrenId.length);
      this.progress.fill([]);
    }
    this.flag=false;
  }
  
  ngOnInit() {
    // this.title = this.activatedRoute.snapshot.paramMap.get('id');
  }

  addchild(){
    if (!GlobalVarsService.check_email(this.ch)){
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
    else{
      this.child=[];
      if (this.ch!="")
      this.child.push(this.ch);
      console.log(this.child);
      let data={email: this.shared.user.email,childrenId: this.child}
      this.showLoader();
      this.authService.postData(data, 'addChildren').then(async (result) => {
        console.log(result);
        await this.loading.dismiss();
        if (result['status'] == 'success') {
          this.flag=false;
          this.ch="";
          localStorage.setItem('childrenId',JSON.stringify(result['data']));
          this.shared.savedata();
          this.is_shown= new Array(this.shared.user.childrenId.length);
          this.is_shown.fill(0);
          this.is_start= new Array(this.shared.user.childrenId.length);
          this.is_start.fill(0);
          this.progress= new Array(this.shared.user.childrenId.length);
          this.progress.fill([]);
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
        await alert.present();
        await this.shared.delay(2000);
        alert.dismiss();
      });
    }
  }
  
  showprogress(idx){
    let data={email:this.shared.user.childrenId[idx]};
    this.load = true
    this.authService.postData(data, 'getProgress').then((result) => {
      console.log(result);
  
      if (result['status'] == 'success') {
        this.is_start[idx]=1;
        this.load = false
        this.progress[idx]=result['data'];
        this.is_shown[idx]=1-this.is_shown[idx];
      }
      else{
        this.is_shown[idx]=1-this.is_shown[idx];
        this.progress[idx]=result['data'];
      }
    },async(err) => {
      console.log(err);
    });
  }

  openpage(){
    this.navCtrl.navigateRoot('level1');
  }

  async showLoader(){
    this.loading = await this.loadingCtrl.create({
        message: 'Adding...',
        duration: 20000,
    });
    await this.loading.present();
  }

}
