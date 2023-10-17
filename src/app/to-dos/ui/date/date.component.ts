import { Component } from '@angular/core';
import { Animations } from '@shared/animations/animations';

@Component({
  selector: 'date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  animations: [Animations],
})
export class DateComponent {
  public toDay: Date = new Date();
}
