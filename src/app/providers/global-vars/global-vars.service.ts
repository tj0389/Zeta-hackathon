import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class GlobalVarsService {
  public static file_url: string='https://karyarat2.0.dearsociety.in/';
  public static api_url: string ='https://arcane-coast-34652.herokuapp.com/';
  public static appurl : string;
  public static appversion : string="1.0.8";
  constructor(public platform : Platform) {
    if(this.platform.is('ios'))
    {
       //GlobalVarsService.appurl='https://apps.apple.com/in/app/dear-society/id1460446829';
    }
    if(this.platform.is('android'))
    {
       GlobalVarsService.appurl='https://play.google.com/store/apps/details?id=app.softomatic.karyarat';
    }
    GlobalVarsService.file_url='https://karyarat2.0.dearsociety.in/';
    GlobalVarsService.api_url='https://arcane-coast-34652.herokuapp.com/';
  }

  public static check_mobile_number(number)
    {
     console.log('inside check_mobile_number function');

     var phoneno = /^\d{10}$/;
     var phoneno12 = /^\d{12}$/;
     number=number.toString();
     if(!number.match(phoneno) && !number.match(phoneno12))
     {console.log('number not match');
       return false;
     }
     if(number.split("").length!=10)
     {
       let mobile_arr = number.split("");
       console.log(mobile_arr);
       if(mobile_arr.length==12)
       {console.log(mobile_arr[0]);console.log(mobile_arr[1]);
         if(mobile_arr[0]==9 && mobile_arr[1]==1)
         {
           return number.substring(2,12);
         }
         else
         {
           return false;
         }
       }
       else
       {
         return false;
       }
     }
     return true;
   }

   public static check_email(number)
  {
     console.log('inside check_email function');

     var regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
     number=number.toString();
     if(!number.match(regex))
       return false;
     else return true;
  }

   public static check_int(number)
   {
     var int_no = /^\d*$/;
     // var int_no12 = /^\d{12}$/;
     number=number.toString();
     if(!number.match(int_no))
       return false;
     else return true;
   }
}