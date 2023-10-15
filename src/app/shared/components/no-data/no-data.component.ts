import { Component, Input } from '@angular/core';
import { Animations } from '@shared/animations/animations';

@Component({
  selector: 'no-data',
  template: `
    <div
      [@animateStagger]="{ value: '100' }"
      class="h-full w-full flex flex-col justify-center items-center gap-4 p-5"
    >
      <div class="flex justify-center items-center">
        <div
          [@animate]="{ value: '*', params: { y: '20px', delay: '100ms' } }"
          class="flex  items-center justify-center w-20 h-20 rounded-full"
          [ngClass]="
            ' text-gray-600 bg-gray-100 dark:text-gray-50 dark:bg-gray-600'
          "
        >
          <!-- <mat-icon style="height: 50px; width: 50px; font-size: 50px">{{
            icon ?? 'manage_search'
          }}</mat-icon> -->
        </div>
      </div>

      <h3
        [@animate]="{ value: '*', params: { y: '-20px', delay: '100ms' } }"
        class="font-medium text-xl"
      >
        {{ text ?? 'لا يوجد اي بيانات للعرض...' }}
      </h3>

      <ng-content></ng-content>
    </div>
  `,
  animations: [Animations],
})
export class NoDataComponent {
  @Input() public text?: string;

  @Input() public icon?: string;
}
