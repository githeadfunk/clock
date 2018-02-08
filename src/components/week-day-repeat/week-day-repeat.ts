import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'week-day-repeat',
  templateUrl: 'week-day-repeat.html'
})
export class WeekDayRepeatComponent {

  text: string;
  @Input()
  repeat: boolean[] = [false,false,false,false,false,false,false];
  @Output()
  change: EventEmitter<boolean[]> = new EventEmitter<boolean[]>();

  constructor() {
    this.text = 'Hello World';
  }

  onClick(day){
    this.repeat[day] = !this.repeat[day];
    this.change.emit(this.repeat);
  }

  

}
