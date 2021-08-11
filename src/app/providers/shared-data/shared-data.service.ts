import { Injectable } from '@angular/core';
import * as level2_data from "../../level2_data.json";

@Injectable({
  providedIn: 'root'
})

export class SharedDataService {

  user = {
    isLogin:false,
    firstName: 'Guest',
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
  max_mcq_level2:number=10;

  qans=null;
  original_mcqs: any = (level2_data as any).default;;
  mcqs=null;
  is_checked=[];

  level2_time_min:number=5;   // level2 time
  level2_time_sec:number=0;   // level time 

  min:number;
  sec:number;
  
  is_timer:boolean=false;

  is_level1:boolean=false;
  is_level2:boolean=false;

  constructor() {
    this.min=this.level2_time_min;
    this.sec=this.level2_time_sec;
    this.savedata();
    console.log(this.user);
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

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  
  savedata(){
    let keys=Object.keys(this.user);
    keys.forEach((key, index) => {
      if (localStorage.getItem(key)!=null && localStorage.getItem(key)!=undefined)
        this.user[key]=localStorage.getItem(key);
    });
    if (this.user['email']!='')
      this.user['isLogin']=true;
  }
  
}
