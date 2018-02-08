import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-alarm-list',
  templateUrl: 'alarm-list.html',
})

export class AlarmListPage {

  alarmList;
  HomePage = HomePage;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private storage: Storage,
    private alertCtrl: AlertController
  ) {
  }

  ionViewWillEnter() { 
    
    this.storage.get('alarmList').then((val) => {
      const alert = this.alertCtrl.create({
        title: 'Get alarm list success',
        subTitle: val[0].time,
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
        }]
      });
      alert.present();
      this.alarmList = val;
    }).catch((error)=>{
      const alert = this.alertCtrl.create({
        title: 'Get alarm list error',
        subTitle: error,
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
        }]
      });
      alert.present();
    });
  }

  repeatTranlate(repeat){
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var r = [];
    for(var i = 0; i < 7; i++){
      if(repeat[i]) r.push(days[i]);
    }
    return r;
  }

  toHomePage(alarm){
    console.log('alarm: ', alarm);
    this.navCtrl.push(this.HomePage, alarm);
  }
  addAlarm(){
    console.log("add");
    this.navCtrl.push(this.HomePage, 'new');
  }
  clearAll(){
    const alert = this.alertCtrl.create({
      title: 'Do you want to delete all alarms',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Delete all',
        handler: () => {
          this.storage.set('alarmList', []);
          this.alarmList = [];
        }
      }]
    });
    alert.present();
  }

}
