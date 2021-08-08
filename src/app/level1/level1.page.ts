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
  max_ques_no:number=0;
  flag:boolean=true;
  
  constructor(public alertController : AlertController,private navCtrl:NavController,private activatedRoute: ActivatedRoute,public shared:SharedDataService,public router:ActivatedRoute) { 
    
    this.id=JSON.parse(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.id==undefined || this.id==null)
      this.id=0;
    else
      this.id+=1;
    if (shared.qans==null || shared.qans==undefined){
      this.fetch_qans();
    }
    if (shared.qans!=null && shared.qans!=undefined){
      this.max_ques_no=this.shared.qans.length;
    }
  }

  ngOnInit() {
    this.isdisabled(); 
  }

  async fetch_qans(){
    this.shared.qans=[{question:'Q1.',answer:'choose the best answer from the choices provided, and fill in the corresponding circle on your answer sheet.'},
      {question:'Q2.',answer:'choose the best answer from the choices provided, and fill in the corresponding circle on your answer sheet.'},
      {question:'Q3.',answer:'choose the best answer from the choices provided, and fill in the corresponding circle on your answer sheet.'},
    ];
    console.log(this.shared.qans);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  
  async isdisabled(){
    this.flag=true;
    await this.delay(2000);
    this.flag=false;
  }
  
  async nextques(id:number){
    console.log(id + ' ' + this.max_ques_no)
    if(id == this.max_ques_no){
      this.alertHandler()
    }
    else
    this.navCtrl.navigateForward(['level1',{id:id}])
  }

  prevques(){
    this.navCtrl.pop();
  }
  alertHandler(){
      this.alertController.create({
        header : 'Congratutions!',
        cssClass : 'alert',
        message : `
              <p>You Have read all the Content<p>
              <img src="../../assets/pngwing.com.png">
                 `,
        buttons: [
          {
            text: 'Level 2',
            cssClass : 'alertBtn',
            handler: () => {
              this.openpage()
            }
          }
        ]
      }).then((alert)=>{
        alert.present()
      })
  }
  openpage(){
    this.navCtrl.navigateForward('level2');
  }

}
