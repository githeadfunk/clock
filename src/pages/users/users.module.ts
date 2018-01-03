import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersPage } from './users';
import { UserPage } from './user/user'

@NgModule({
  declarations: [
    UsersPage,
    UserPage
  ],
  imports: [
    IonicPageModule.forChild(UsersPage),
  ],
  entryComponents: [
    UsersPage,
    UserPage
  ]
})
export class UsersPageModule {}
