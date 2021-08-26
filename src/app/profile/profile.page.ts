import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { }
  flag = "male";
  first = ""
  last = ""
  mobile
  pan 
  dob
  ngOnInit() {
  }
  changerole(){ 
   
    
      if(this.flag == "male"){
        this.flag = "female"
      }
      else{
        this.flag = "male"
      }
  }
  submitHandler(){
    let  data = {
      firstname : this.first,
      lastname : this.last,
      pancard : this.pan,
      mobile : this.mobile,
      dob : this.dob.substring(0,10),
      gender : this.flag,
    }
    console.log(data)
  }
}
