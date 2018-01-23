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

  constructor(
    private alertCtrl: AlertController,
    private fileChooser: FileChooser,
    private file: File,
    private vibration: Vibration,
    private nativeAudio: NativeAudio,
    private filePath: FilePath,
    private media: Media
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
    // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesnt exist'));
    // const tit = this.file.applicationDirectory;
    // const myalert = this.alertCtrl.create({
    //   title: tit
    // });
    // myalert.present();
    this.fileChooser.open().then((url) => {
      (<any>window).FilePath.resolveNativePath(url, (result) => {
        this.musicUrl = result;
      })
      const myalert = this.alertCtrl.create({
        title: this.musicUrl
      });
      myalert.present();
    })
    // this.fileChooser.open()
    //   .then(uri => {
    //     this.musicUrl = uri;
    //     const myalert = this.alertCtrl.create({
    //       title: uri
    //     });
    //     myalert.present();
    //   })
    //   .catch(e => {
    //     const myalert = this.alertCtrl.create({
    //       title: e
    //     });
    //     myalert.present();
    //   });
    
  }

  changeVibration(){
    if(this.vibrationON){
      this.vibration.vibrate(1000);
      console.log("vibrating");
    }
  }

  play(){
    //save to SharedPrefences
    const file: MediaObject = this.media.create(this.musicUrl);
    file.play();
  }

  ionViewDidLoad () {
    // this.subscription = Observable.interval(1000).subscribe(x => {
    //   var time = new Date();
    // });
  }
  stopTheIterations () {
    this.subscription.unsubscribe ();
  }


}
