import { Injectable } from '@angular/core';
import { User } from '../../interfaces/User';


@Injectable({
  providedIn: 'root'
})


export class SharedDataService {

  user: User = {
    isLogin:false,
    firstName: '',
    lastName: '',
    email: '',
    userType: '',
    mobile: 0,
    childrenId: []
  };


  cardNumber = "1020 3949 4893 3983";
  cvv = 100;
  balance = 1000;

  mcq_score:number=0;
  mcq_score_count;

  qans=null;
  mcqs=null;
  is_checked=[];

  min:number=0;
  sec:number=30;

  is_timer:boolean=false;

  is_level1:boolean=false;
  is_level2:boolean=false;

  constructor() {
  }


  
}
