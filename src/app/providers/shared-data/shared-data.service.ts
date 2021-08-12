import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import * as level2_data from "../../level2_data.json";
import * as level1_data from "../../level1_data.json";

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
    childrenId: Array(0),
  };
  
  current_level=0;
  
  //level 1
  passage=null;
  level1_score_count;
  level1_score:number=0;
  original_passage: any = (level1_data as any).default;
  is_level1_complete:boolean=false;
  max_mcq_level1:number;

  // level 2
  level2_score:number=0;
  is_level2_complete:boolean=false;
  mcqs=null;
  is_timer:boolean=false;
  mcq_count:number=0;
  mcq_score_count;
  max_mcq_level2:number=10;
  original_mcqs: any = (level2_data as any).default;
  is_checked=[];
  level2_time_min:number=5;   // level2 time
  level2_time_sec:number=0;   // level2 time 
  min:number;
  sec:number;
  
  //level 3
  cardNumber = "1020 3949 4893 3983";
  cvv = 100;
  balance = 1000;
  otp_time:number=59;
  otptime;
  is_transaction_complete:boolean=false;
  
  constructor(public authService:AuthService) {
    this.max_mcq_level1=this.original_passage.length;
    this.min=this.level2_time_min;
    this.sec=this.level2_time_sec;
    this.savedata();
    let val=localStorage.getItem('currentLevel');
    if (val!=null && val!=undefined && val!='')
      this.current_level=Number(val);
    console.log(this.user,this.level1_score,this.level2_score,this.is_transaction_complete);
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
      if (localStorage.getItem(key)!=null && localStorage.getItem(key)!=undefined){
        if (key=='childrenId')
          this.user[key]=JSON.parse(localStorage.getItem(key));
        else
          this.user[key]=localStorage.getItem(key);
      }
    });
    if (this.user['email']!='')
      this.user['isLogin']=true;
  };
  
  async savescore(index:number){
    let data={email:this.user.email,currentLevel:this.current_level,level1:{"totatQuestions": this.max_mcq_level1,"read": this.level1_score},level2:{"totatQuestions": this.max_mcq_level2,"correct": this.level2_score},level3: this.is_transaction_complete};
    this.authService.postData(data, 'updateProgress').then(async (result) => {
      console.log(result);
      if (result['status'] == 'success') {
        if (index==1){
          let keys=Object.keys(result['data']);
          keys.forEach((key, index) => {
            if (key=='email'){}
            else if (key=='level2' || key=='level1')
              localStorage.setItem(key,JSON.stringify(result['data'][key]));
            else
              localStorage.setItem(key,result['data'][key]);
          });
        }
      }
    },async (err) => {
      console.log(err);
    });
  }
  
  getscore(){
    let data={email:this.user.email};
    this.authService.postData(data, 'getProgress').then(async (result) => {
      console.log(result);
      if (result['status'] == 'success') {
        this.level1_score=result['data']['level1'].read;
        this.level2_score=result['data']['level2'].correct;
        this.is_transaction_complete=result['data']['level3'];
        this.current_level=result['data']['currentLevel'];
        // console.log(result['data']['level1'].read,result['data']['level2'].correct,result['data']['level3'])
        let keys=Object.keys(result['data']);
        keys.forEach((key, index) => {
          if (key=='email'){}
          else if (key=='level2' || key=='level1')
            localStorage.setItem(key,JSON.stringify(result['data'][key]));
          else
            localStorage.setItem(key,result['data'][key]);
        });
      }
    },async (err) => {
      console.log(err);
    });
  }
}
