import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { GlobalVarsService } from '../global-vars/global-vars.service';

let appUrl = GlobalVarsService.api_url;
let key = '$2y$10$nltmJ89a/ARdkKrZLtu1Q.8hnm4M0TRaLC6Y9gDF1V.YDlJ16/rG.';
let kAppUrl = GlobalVarsService.k_api_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http: HttpClient) {
    // 
  }

  KarPostData(credentials,type){
    return new Promise((resolve, reject)=>{
      let headers = 
      {
      'accept':'application/json',
      'Content-Type':'application/json'}

      this.http.post(kAppUrl+type,credentials,{headers: headers}).subscribe(res =>{
        resolve(res);
      }, (err)=>{
        reject(err);
      });
    });
  }

  KarGetData(type)
  {
    return new Promise((resolve, reject)=>{
      let headers = 
      {
      'accept':'application/json',
      'Content-Type':'application/json'}
      this.http.get(kAppUrl+type,{headers: headers}).subscribe(res =>{
        resolve(res);
      }, (err)=>{
        reject(err);
      });
    });
  }

  postData(credentials, type)
  {
    return new Promise((resolve, reject)=>{
      let headers = 
      {'key':key,
      'accept':'application/json',
      'Content-Type':'application/json'}

      this.http.post(appUrl+type,credentials,{headers: headers}).subscribe(res =>{
        resolve(res);
      }, (err)=>{
        reject(err);
      });
    });
  }

  getData(type)
  {
    return new Promise((resolve, reject)=>{
      let headers = 
      {'key':key,
      'accept':'application/json',
      'Content-Type':'application/json'}
      this.http.get(appUrl+type,{headers: headers}).subscribe(res =>{
        resolve(res);
      }, (err)=>{
        reject(err);
      });
    });
  }
}
