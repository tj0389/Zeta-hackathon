import { NavController } from '@ionic/angular';
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

  constructor(private navCtrl:NavController,private activatedRoute: ActivatedRoute,public shared:SharedDataService) { 
    
    if (shared.mcqs==null || shared.mcqs==undefined){
      this.fetch_mcqs();
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

  ionViewWillEnter(){
    this.shared.mcq_score=0;
    this.shared.mcq_score_count.forEach((value,index) => {
      if (value==1){
        this.shared.mcq_score+=1;
      }
    });
  }

  async fetch_mcqs(){
    this.shared.mcqs=[{question:'question1',option:['Haa','Bol','Saale'],answer:'Bol'},
    {question:'question2',option:['Haa','Bol','Saale','Mere'],answer:'Bol'},
    {question:'question3',option:['Haa','Mere'],answer:'Haa'},
    {question:'question4',option:['Haa','Bol','Saale','Mere'],answer:'Bol'},
    ];
    console.log(this.shared.mcqs);
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
    this.navCtrl.navigateForward(['level2',{id:id}]);
  }

  prevques(){
    this.navCtrl.pop();
  }

  openpage(){
    this.navCtrl.navigateForward('level3');
  }

}
