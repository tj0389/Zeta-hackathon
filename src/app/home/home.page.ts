import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedDataService } from '../providers/shared-data/shared-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class homePage implements OnInit {
  public title: string;
  child_data;
  
  constructor(private activatedRoute: ActivatedRoute,private navCtrl:NavController,public shared:SharedDataService) {
    this.child_data=this.shared.user.childrenId;
    console.log(this.child_data);
  }
  
  ngOnInit() {
    // this.title = this.activatedRoute.snapshot.paramMap.get('id');
  }

  openpage(){
    this.navCtrl.navigateRoot('level1');
  }

}
