import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../providers/shared-data/shared-data.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private navCtrl: NavController, private shared: SharedDataService) { }

  firstName: string;
  lastName: string;

  ngOnInit() {
  }

  logIn() {
    this.navCtrl.navigateForward('login');
  }

  signUp() {
    // first validate input data

    console.log(this.firstName);
    //this.authService.postData("{}", "registerUser");  
  }



}
