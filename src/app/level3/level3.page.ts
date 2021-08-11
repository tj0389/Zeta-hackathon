import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../providers/shared-data/shared-data.service';

@Component({
  selector: 'app-level3',
  templateUrl: './level3.page.html',
  styleUrls: ['./level3.page.scss'],
})
export class Level3Page implements OnInit {

  id:number;
  time : number=15;
  currentView: number;
  Instructions = 0;
  showCardDetails = 1;
  inputTransactionDetails = 2;
  inputOTP = 3;
  interval : any
  count = 0

  constructor(public shared: SharedDataService,public navCtrl:NavController,private activatedRoute:ActivatedRoute) {

    this.id=JSON.parse(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.id==undefined || this.id==null)
      this.id=0;
    else
      this.id+=1;
  }

  ngOnInit() {
  }

  nextpage(id:number){
    this.navCtrl.navigateForward(['level3',{id:id}]);
  }

  startLevel() {
    console.log("starting level!");
    this.currentView = this.showCardDetails;
  }

  startTask() {
    console.log("Task is started now!");
    this.currentView = this.inputTransactionDetails;
  }

  pay() {
    console.log("Payment is initiated!");
    this.currentView = this.inputOTP;
    this.setTime()
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async setTime(){
    while(this.time>0){
      await this.delay(1000);
      this.time=this.time-1;
    }
  }
  
  checkOTP() {
    console.log("Verifying transaction!!");
    //this.currentView = this.inputOTP;
  }

}
