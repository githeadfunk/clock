import { NgModule } from '@angular/core';
import { WeekDayRepeatComponent } from './week-day-repeat/week-day-repeat';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [WeekDayRepeatComponent],
	imports: [
		IonicModule.forRoot(WeekDayRepeatComponent)
	],
	exports: [WeekDayRepeatComponent]
})
export class ComponentsModule {}
