import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage implements OnInit{

  constructor (
    private navParams: NavParams,
  ){}
  name: string;

  ngOnInit(){
    this.name = this.navParams.data;
    console.log('this.name: ', this.name);
  }

}