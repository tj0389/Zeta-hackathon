import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../providers/shared-data/shared-data.service';
import { RestCallService } from '../rest-call.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private navCtrl: NavController, private shared: SharedDataService, private restCallService: RestCallService) { }

  firstName: string="";
  lastName: string="";
  email: string="";
  mobile: string="";
  userType: string="";
  password: string="";

  ngOnInit() {
  }

  logIn() {
    this.navCtrl.navigateForward('login');
  }

  signUp() {
    // first validate input data

    var data:any,res:any;
    data = {
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.email,
      "mobile": this.mobile,
      "userType": this.userType,
      "password": this.password,
      "childrenId": []
    };
    console.log("Request is ", data);
    res = this.restCallService.postData(data, "registerUser");
    console.log(res);  
  }

}
