import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../providers/shared-data/shared-data.service';

@Component({
  selector: 'app-level3',
  templateUrl: './level3.page.html',
  styleUrls: ['./level3.page.scss'],
})
export class Level3Page implements OnInit {

  currentView: number;
  Instructions = 0;
  showCardDetails = 1;
  inputTransactionDetails = 2;
  inputOTP = 3;
  

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
  }

  checkOTP() {
    console.log("Verifying transaction!!");
    //this.currentView = this.inputOTP;
  }

}
