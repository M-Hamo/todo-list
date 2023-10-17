import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDosRoutingModule } from './to-dos-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AutofocusDirective } from '@shared/directives/autofocus.directive';

@NgModule({
  declarations: [ToDosRoutingModule.Components],
  imports: [CommonModule, ToDosRoutingModule, SharedModule, AutofocusDirective],
})
export class ToDosModule {}
