import { Component } from '@angular/core';

@Component({
  selector: 'week-day-repeat',
  templateUrl: 'week-day-repeat.html'
})
export class WeekDayRepeatComponent {

  text: string;
  repeat: boolean[] = [false,false,false,false,false,false,false];

  constructor() {
    this.text = 'Hello World';
  }

  onClick(day){
    this.repeat[day] = !this.repeat[day];
    console.log('this.repeat: ', this.repeat);
  }

}
