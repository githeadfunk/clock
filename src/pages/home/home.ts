import { Component } from '@angular/core';
import { UsersPage } from '../users/users';
import { WeekDayRepeatComponent } from '../../components/week-day-repeat/week-day-repeat';
import { AlertController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  usersPage = UsersPage;
  myDate = Date.now();
  alarmName: string = "";

  constructor(
    private alertCtrl: AlertController,
    private fileChooser: FileChooser,
    private file: File
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

    this.fileChooser.open()
      .then(uri => {
        const myalert = this.alertCtrl.create({
          title: uri
        });
        myalert.present();
      })
      .catch(e => {
        const myalert = this.alertCtrl.create({
          title: e
        });
        myalert.present();
      });
  }

}
