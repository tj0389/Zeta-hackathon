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
    
    this.id=JSON.parse(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.id==undefined || this.id==null)
      this.id=0;
    else
      this.id+=1;
    if (shared.mcqs!=null && shared.mcqs!=undefined)
      this.max_mcqs_no=this.shared.mcqs.length;
  }
  
  ngOnInit() {

  }
  
  nextques(id:number){
    this.navCtrl.navigateForward(['level2',{id:id}])
  }

  prevques(){
    this.navCtrl.pop();
  }

  openpage(){
    this.navCtrl.navigateForward('level3');
  }

}
