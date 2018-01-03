import { Component } from '@angular/core';
import { UserPage } from './user/user';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  
  userPage = UserPage;
  wyh: string = "wyh";
  wyh1: string = "wyh1";
}
