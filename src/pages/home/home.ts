import { Component } from '@angular/core';
import { WeekDayRepeatComponent } from '../../components/week-day-repeat/week-day-repeat';
import { AlertController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';
import { FilePath } from '@ionic-native/file-path';
import { Media, MediaObject } from '@ionic-native/media';
import { Observable } from 'rxjs/Rx';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import { AlarmListPage } from '../alarm-list/alarm-list';
import { NavController } from 'ionic-angular/navigation/nav-controller';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  AlarmListPage = AlarmListPage;
  alarmName: string = "";
  vibrationON: boolean = false;
  musicUrl: string = "";
  subscription;
  repeat: boolean[] = [];
  alarm = {
    id: 1,
    time: '',
    vibrationON: false,
    musicUrl: '',
    repeat: [false, false, false, false, false, false, false],
    active: true
  };

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private fileChooser: FileChooser,
    private file: File,
    private vibration: Vibration,
    private nativeAudio: NativeAudio,
    private filePath: FilePath,
    private media: Media,
    private localNotifications: LocalNotifications,
    private storage: Storage,
    private navParams: NavParams
  ){
    if(navParams.data != 'new') {
      this.alarm = navParams.data;
    }
  }

  chooseAlarmTone(){
    this.fileChooser.open().then((url) => {
      (<any>window).FilePath.resolveNativePath(url, (result) => {
        this.alarm.musicUrl = result;
      })
    })
  }

  changeVibration(){
    if(this.alarm.vibrationON){
      this.vibration.vibrate(1000);
    }
  }

  play(){
    //save to SharedPrefences
    //should use music control, background mode
    const file: MediaObject = this.media.create(this.alarm.musicUrl);
    file.play();
    file.onSuccess.subscribe(() => console.log('Action is successful'));
    this.storage.set('name', {Max: 'wyh'});
    this.storage.get('name').then((val) => {
    });
  }

  ionViewDidLoad () {
    // this.subscription = Observable.interval(1000).subscribe(x => {
    //   var time = new Date();
    //   console.log('time: ', time);
    // });
  }
  stopTheIterations () {
    this.subscription.unsubscribe ();
  }
  saveAlarm(){
    var isValid = this.runValidation();
    if(isValid != true){
      const alert = this.alertCtrl.create({
        title: 'Alarm not valid',
        subTitle: isValid,
        buttons: ['Dismiss']
      });
      alert.present();
    }
    else{
      this.storage.get('alarmList').then((val) => {
        if(val.length > 0){
          for(var i = 0; i < val.length; i++){
            if(val[i].id == this.alarm.id) {
              val[i] = this.alarm;
              this.storage.set('alarmList', val);
            }
          }
          this.alarm.id = val[val.length - 1].id + 1;
          val.push(this.alarm);
          this.storage.set('alarmList', val);
        }
        else{
          var alarmList = [];
          alarmList.push(this.alarm);
          this.storage.set('alarmList', alarmList);
        }
      })
      this.navCtrl.pop();
    }
    
  }
  
  runValidation(){
    if(!this.alarm.time) return "Please select time";
    if(this.alarm.repeat.indexOf(true) == -1) return "Please select repeat days";
    if(!this.alarm.musicUrl) return "Please select repeat music";
    return true;
  }

  repeatChange(event){
    this.alarm.repeat = event;
  }

  cancel(){
    this.navCtrl.pop();
  }

}
