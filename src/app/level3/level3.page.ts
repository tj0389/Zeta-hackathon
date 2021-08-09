import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../providers/shared-data/shared-data.service';

@Component({
  selector: 'app-level3',
  templateUrl: './level3.page.html',
  styleUrls: ['./level3.page.scss'],
})
export class Level3Page implements OnInit {
  time : number=15;
  currentView: number;
  Instructions = 0;
  showCardDetails = 1;
  inputTransactionDetails = 2;
  inputOTP = 3;
  interval : any
  count = 0

  constructor(public shared: SharedDataService) {
    this.currentView = this.Instructions;
  }

  ngOnInit() {
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
