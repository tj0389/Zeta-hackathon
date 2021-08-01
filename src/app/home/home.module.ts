import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { homePageRoutingModule } from './home-routing.module';

import { homePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    homePageRoutingModule
  ],
  declarations: [homePage]
})
export class homePageModule {}
