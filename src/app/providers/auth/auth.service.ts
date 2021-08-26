import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { GlobalVarsService } from '../global-vars/global-vars.service';
import { NavController } from '@ionic/angular';

let appUrl = GlobalVarsService.api_url;
let zetaurl=`https://fusion.preprod.zeta.in/api/v1/ifi/140793/`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http: HttpClient, public navCtrl: NavController) {
    //
  }

  getzetaapi(req) {
    let customHeaders = {
      'Content-Type': 'application/json',
      'X-Zeta-AuthToken': 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidGFnIjoiQS10WEJzbmc3MzFCbzdXX3VmTHFRdyIsImFsZyI6IkExMjhHQ01LVyIsIml2IjoibGtRN2l0Ukc3c1FIOWpwbyJ9.cqOfj-TsUgQwSjx2ch3ySm0ph44IQviWqVTfSAPN-A8.7rR5lMRvjRLKq_2hi158gw.H040En8DSMegkWH16maCRSleNW-ZpmGXFVUjZUgT9iuAYPRNlEIzjU1hCk1bnT18ic34tMVkeMMAiskJgOTyeA-627V_5C-y8xGIoSF6c5P9tEsu1cURX55EmFl5A4OAYb3xHJNYpueeWSsTMkyk60fg7ZA1ATr74B0QzEo1zKnjzZxQoZHYayWKlFmi-LSYic3lnDFgV35WEjveSzzPyOZQprTkDh5ee21QbJkER2lZWv5KqQge1ViOhi1UPWa1OjtJyAQGv86W17EQ2wA0_ESFUg3-kahwfhhr5_PxtWc_P698vQ-fFiXL0Qvra_-6erzJcvy4ghUanp5k2xUNkR-nC_tX3lLqvAqL3Ad_PqdDdOPcGdd0qHPSJBDf6lB1.IKEnNxngSfQRGEunXf6b8w',
    };
    const httpOptions = {
      headers: new HttpHeaders(customHeaders)
    };

    return new Promise(resolve => {
      this.http.get(zetaurl + req, httpOptions).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log("Error : " + req);
        console.log(err);
      });

    });
  }
  
  postzataapi(data, req) {
    let customHeaders = {
      'Content-Type': 'application/json',
      'X-Zeta-AuthToken': 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidGFnIjoiQS10WEJzbmc3MzFCbzdXX3VmTHFRdyIsImFsZyI6IkExMjhHQ01LVyIsIml2IjoibGtRN2l0Ukc3c1FIOWpwbyJ9.cqOfj-TsUgQwSjx2ch3ySm0ph44IQviWqVTfSAPN-A8.7rR5lMRvjRLKq_2hi158gw.H040En8DSMegkWH16maCRSleNW-ZpmGXFVUjZUgT9iuAYPRNlEIzjU1hCk1bnT18ic34tMVkeMMAiskJgOTyeA-627V_5C-y8xGIoSF6c5P9tEsu1cURX55EmFl5A4OAYb3xHJNYpueeWSsTMkyk60fg7ZA1ATr74B0QzEo1zKnjzZxQoZHYayWKlFmi-LSYic3lnDFgV35WEjveSzzPyOZQprTkDh5ee21QbJkER2lZWv5KqQge1ViOhi1UPWa1OjtJyAQGv86W17EQ2wA0_ESFUg3-kahwfhhr5_PxtWc_P698vQ-fFiXL0Qvra_-6erzJcvy4ghUanp5k2xUNkR-nC_tX3lLqvAqL3Ad_PqdDdOPcGdd0qHPSJBDf6lB1.IKEnNxngSfQRGEunXf6b8w',
    };
    const httpOptions = {
      headers: new HttpHeaders(customHeaders)
    };
    
    return new Promise(resolve => {
      this.http.post(zetaurl + req, data, httpOptions).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log("Error : " + req);
        console.log(err);
      });
    });
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