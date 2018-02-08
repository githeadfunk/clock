import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AlarmListPage } from '../pages/alarm-list/alarm-list';
import { ComponentsModule } from '../components/components.module';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';
import { FilePath } from '@ionic-native/file-path';
import { Media } from '@ionic-native/media';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AlarmListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AlarmListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileChooser,
    File,
    Vibration,
    NativeAudio,
    FilePath,
    Media,
    LocalNotifications
  ]
})
export class AppModule {}
