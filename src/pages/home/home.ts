import { Component } from '@angular/core';
import { UsersPage } from '../users/users';
import { WeekDayRepeatComponent } from '../../components/week-day-repeat/week-day-repeat';
import { AlertController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';
import { FilePath } from '@ionic-native/file-path';
import { Media, MediaObject } from '@ionic-native/media';
import { Observable } from 'rxjs/Rx';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  usersPage = UsersPage;
  myDate = Date.now();
  alarmName: string = "";
  vibrationON: boolean = false;
  musicUrl: string = "";
  subscription;
  repeat: boolean[] = [];

  constructor(
    private alertCtrl: AlertController,
    private fileChooser: FileChooser,
    private file: File,
    private vibration: Vibration,
    private nativeAudio: NativeAudio,
    private filePath: FilePath,
    private media: Media,
    private localNotifications: LocalNotifications,
    private storage: Storage
  ){

  }

  


  editName(){
    const nameAlert = this.alertCtrl.create({
      title: "Alarm name",
      inputs: [
        {
          name: 'alarmName',
          placeholder: 'Alarm name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            this.alarmName = data.alarmName;
            console.log('this.alarmName: ', this.alarmName);
          }
        }
      ]
    });
    nameAlert.present();
  }

  chooseAlarmTone(){
    this.fileChooser.open().then((url) => {
      (<any>window).FilePath.resolveNativePath(url, (result) => {
        this.musicUrl = result;
      })
      const myalert = this.alertCtrl.create({
        title: this.musicUrl
      });
      myalert.present();
    })
  }

  changeVibration(){
    if(this.vibrationON){
      this.vibration.vibrate(1000);
      console.log("vibrating");
    }
  }

  play(){
    //save to SharedPrefences
    //should use music control, background mode
    const file: MediaObject = this.media.create(this.musicUrl);
    file.play();
    file.onSuccess.subscribe(() => console.log('Action is successful'));
    this.storage.set('name', {Max: 'wyh'});
    this.storage.get('name').then((val) => {
      console.log('Your age is', val);
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
    this.storage.get('alarmList').then((val) => {
      if(val){
        const alert = this.alertCtrl.create({
          title: 'Alarm list exists',
          subTitle: val,
          buttons: ['Dismiss']
        });
        alert.present();
      }
      else{
        var isValid = this.runValidation();
        const alert = this.alertCtrl.create({
          title: 'Validation',
          subTitle: 'is valid' + isValid,
          buttons: ['Dismiss']
        });
        alert.present();

      }
    })
  }
  
  runValidation(){
    if(!this.myDate) return "no time";
    if(!this.repeat) return "no days";
    if(!this.musicUrl) return "no music";
    return true;
  }

  repeatChange(event){
    this.repeat = event;
  }

}
