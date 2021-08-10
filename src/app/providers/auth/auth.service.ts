import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { GlobalVarsService } from '../global-vars/global-vars.service';
import { NavController } from '@ionic/angular';

let appUrl = GlobalVarsService.api_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http: HttpClient, public navCtrl: NavController) {
    //
  }

  getData(req) {
    let customHeaders = {
      'Content-Type': 'application/json',
      'key': ""
    };
    const httpOptions = {
      headers: new HttpHeaders(customHeaders)
    };

    return new Promise(resolve => {
      this.http.get(appUrl + req, httpOptions).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log("Error : " + req);
        console.log(err);
      });

    });
  }
  
  postData(data, req) {
    let customHeaders = {
      'Content-Type': 'application/json'
    };
    const httpOptions = {
      headers: new HttpHeaders(customHeaders)
    };

    return new Promise(resolve => {
      this.http.post(appUrl + req, data, httpOptions).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log("Error : " + req);
        console.log(err);
      });
    });
  }
}