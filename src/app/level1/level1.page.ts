import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../providers/shared-data/shared-data.service';

@Component({
  selector: 'app-level1',
  templateUrl: './level1.page.html',
  styleUrls: ['./level1.page.scss'],
})
export class Level1Page implements OnInit {

  id:number;
  max_passage_no:number=0;
  flag:boolean=true;
  
  constructor(public alertController : AlertController,private navCtrl:NavController,private activatedRoute: ActivatedRoute,public shared:SharedDataService,public router:ActivatedRoute) { 

    if (this.shared.passage==null || this.shared.passage==undefined){
      this.fetch_passage();
    }
    
    this.id=JSON.parse(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.id==undefined || this.id==null)
      this.id=0;
    else
      this.id+=1;

    if (this.shared.passage!=null && this.shared.passage!=undefined)
      this.max_passage_no=this.shared.passage.length;
      
  }
  
  ngOnInit() {
    this.isdisabled(); 
    let score:number=this.id;
    if (score>0)
      score-=1;
    console.log(score);
    let pre_score:number=0;
    let val=JSON.parse(localStorage.getItem('level1'));
    if (val!=null && val!=undefined && val!=''){
      pre_score=val.read;
      if (score>pre_score)
        this.shared.level1_score=score;
        this.shared.savescore(1);
    }
    else{
      this.shared.level1_score=score;
      this.shared.savescore(1);
    }
  }
  
  async fetch_passage(){
    this.shared.passage=this.shared.original_passage;
    this.shared.level1_score_count= new Array(this.shared.passage.length);
    this.shared.level1_score_count.fill(0);
  }
  
  async isdisabled(){
    this.flag=true;
    this.shared.delay(2000)
    .then(()=>{
      this.flag=false;
    })

  }
  
  async nextques(id:number){
    if(id == this.max_passage_no){
      this.alertHandler();
      this.shared.current_level=Math.max(this.shared.current_level,2);
      this.shared.savedata();
      this.navCtrl.navigateRoot(['level1',{id:id}])
    }
    else
      this.navCtrl.navigateForward(['level1',{id:id}])
  }
  
  prevques(){
    this.navCtrl.pop();
  }

  alertHandler(){
      this.alertController.create({
      header : 'Congratulations!!',
      cssClass : 'custom-wrapper',
      message :`<img src="../../assets/pngwing.com.png">`,
    }).then(async (alert)=>{
      alert.present();
      await this.shared.delay(2000);
      alert.dismiss();
    })
  }

  openpage(){
    this.navCtrl.navigateRoot('level2');
  }

}
