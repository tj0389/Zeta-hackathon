import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RestCallService {

  api_url = 'https://arcane-coast-34652.herokuapp.com/';

  constructor(public http: HttpClient) {
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
      this.http.get(this.api_url + req, httpOptions).subscribe((data: any) => {
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
      this.http.post(this.api_url + req, data, httpOptions).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log("Error : " + req);
        console.log(err);
      });
    });
  }
}
