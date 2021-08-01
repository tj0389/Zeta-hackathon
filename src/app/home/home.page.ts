import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class homePage implements OnInit {
  public title: string;

  constructor(private activatedRoute: ActivatedRoute,private navCtrl:NavController) { }

  ngOnInit() {
    // this.title = this.activatedRoute.snapshot.paramMap.get('id');
  }

  openpage(){
    this.navCtrl.navigateForward('level1');
  }

}
