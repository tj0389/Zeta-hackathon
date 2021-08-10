import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../providers/shared-data/shared-data.service';
import { RestCallService } from '../rest-call.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private navCtrl: NavController, private restCallService: RestCallService) { }

  ngOnInit() {
  }

  logIn() {

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
    this.navCtrl.navigateForward('signup');
  }

}
