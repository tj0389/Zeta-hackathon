import { Injectable } from '@angular/core';
import { User } from '../../interfaces/User';
import * as level2_data from "../../level2_data.json";

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
  max_mcq_level2:number=2;

  qans=null;
  original_mcqs: any = (level2_data as any).default;;
  mcqs=null;
  is_checked=[];

  min:number=0;
  sec:number=30;

  is_timer:boolean=false;

  is_level1:boolean=false;
  is_level2:boolean=false;

  constructor() {
    console.log(this.original_mcqs);
  }

  shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
}
