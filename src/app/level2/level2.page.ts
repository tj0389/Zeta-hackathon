import { AlertController, MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../providers/shared-data/shared-data.service';

@Component({
  selector: 'app-level2',
  templateUrl: './level2.page.html',
  styleUrls: ['./level2.page.scss'],
})

export class Level2Page implements OnInit {

  id:number;
  max_mcqs_no:number=0;

  constructor(public alertController : AlertController, private navCtrl:NavController,private activatedRoute: ActivatedRoute,public shared:SharedDataService,public menuCtrl:MenuController) { 
    
    if (shared.mcqs==null || shared.mcqs==undefined){
      this.fetch_mcq();
    }
    if (shared.mcqs!=null && shared.mcqs!=undefined){
      this.max_mcqs_no=this.shared.mcqs.length;
    }
    this.id=JSON.parse(this.activatedRoute.snapshot.paramMap.get('id'));
    
    if (this.id==undefined || this.id==null)
      this.id=0;
    else{
      this.id+=1;
      if (this.id!=0 && this.id<=this.max_mcqs_no){
        if (this.shared.is_checked[this.id-1]==null || this.shared.is_checked[this.id-1]==undefined){
          this.shared.is_checked[this.id-1] = new Array(this.shared.mcqs[this.id-1].option.length);
          this.shared.is_checked[this.id-1].fill(false);
        }
      }
    }
  }
  
  ngOnInit() {
   
  }
  
  async fetch_mcq(){
    this.shared.original_mcqs=this.shared.shuffle(this.shared.original_mcqs);
    this.shared.mcqs=this.shared.original_mcqs.slice(0,this.shared.max_mcq_level2);
    this.shared.is_checked = new Array(this.shared.mcqs.length);
    this.shared.mcq_score_count= new Array(this.shared.mcqs.length);
    this.shared.mcq_score_count.fill(0);
  }
  
  checked(idx){
    let flag=1;
    let curr_fill=this.shared.is_checked[this.id-1][idx];
    this.shared.is_checked[this.id-1].fill(false);
    this.shared.is_checked[this.id-1][idx]=!curr_fill;
    this.shared.is_checked[this.id-1].forEach((value,index) => {
      if (value==true){
        if (this.shared.mcqs[this.id-1].answer==this.shared.mcqs[this.id-1].option[index]){
          this.shared.mcq_score_count[this.id-1]=1;
          flag=0;
        }
      }
    });
    if (flag==1)
      this.shared.mcq_score_count[this.id-1]=0;
  }

  nextques(id:number){
    if(id == this.max_mcqs_no){
      this.showsubmitpopup();
    }
    else{
      if (this.id==0){
        this.fetch_mcq();
        if (this.shared.is_timer==false){
          this.shared.is_timer=true;
          this.resettimer();
          this.setTime();
          this.menuCtrl.enable(false);
        }
        this.navCtrl.navigateRoot(['level2',{id:id}]);
      }
      else
        this.navCtrl.navigateForward(['level2',{id:id}]);
    }
  }
  
  prevques(){
    this.navCtrl.pop();
  }

  openpage(page){
    this.navCtrl.navigateRoot(page);
  }

  showsubmitpopup(){
    this.alertController.create({
      header : 'Submit',
      cssClass : 'modal-wrapper',
      message : `Are you sure want to submit the test`,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.submittest();
          }
        },'NO'
      ]
    }).then((alert)=>{
      alert.present()
    })
  }

  submittest(){
    this.stoptimer();
    this.resettimer();
    this.menuCtrl.enable(true);
    this.navCtrl.navigateRoot(['level2',{id:this.max_mcqs_no}]);
    this.shared.mcq_score=0;
    this.shared.mcq_score_count.forEach((value,index) => {
      if (value==1){
        this.shared.mcq_score+=1;
      }
    });
    this.shared.is_checked = new Array(this.shared.mcqs.length);
    this.shared.mcq_score_count= new Array(this.shared.mcqs.length);
    this.shared.mcq_score_count.fill(0);
    this.alertController.create({
      header : 'Congratulations!!',
      cssClass : 'custom-wrapper',
      message :`<img src="../../assets/pngwing.com.png">`,
    }).then(async (alert)=>{
      alert.present();
      await this.delay(2000);
      alert.dismiss();
    })
  }
  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  resettimer(){
    this.shared.min=this.shared.level2_time_min;
    this.shared.sec=this.shared.level2_time_sec;
  }
  
  stoptimer(){
    this.shared.is_timer=false;
  }
  
  timefinished(){
    this.alertController.create({
      header : `Time's Up`,
      cssClass : 'modal-wrapper',
      message : `Your Test will be auto-submitted`,
    }).then(async (alert)=>{
      alert.present();
      await this.delay(2000);
      alert.dismiss();
      this.submittest();
    })
  }
  
  async setTime(){
    while(this.shared.is_timer && this.shared.min>=0 && this.shared.sec>=0){
      if (this.shared.min==0 && this.shared.sec==0)
        break;
      await this.delay(1000);
      if (this.shared.sec==0 && this.shared.min>0){
        this.shared.sec=59;
        this.shared.min=this.shared.min-1;
      }
     else
        this.shared.sec=this.shared.sec-1;
    }
    if (this.shared.min==0 && this.shared.sec==0){
      this.timefinished();
    }
  }

}
