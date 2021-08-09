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

  postData(credentials, type)
  {
      return new Promise((resolve, reject)=>{
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'POST');
        headers.append('Access-Control-Allow-Origin', '*');
        this.http.post(appUrl+type,credentials,{ headers:headers }).subscribe(res =>{
          resolve(res);
        }, (err)=>{
          console.log('inside error');
          reject(err);
        });
      });
  }
  
  getData(type)
  {
      return new Promise((resolve, reject)=>{
      const headers = new HttpHeaders();
        this.http.get(appUrl+type,{ headers }).subscribe(res =>{
          resolve(res);
        }, (err)=>{
          console.log('inside error');
          reject(err);
        });
      });
  }
}