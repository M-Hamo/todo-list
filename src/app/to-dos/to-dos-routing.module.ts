import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoListComponent } from './features';
import { DateComponent, TodoFormGroupComponent } from './ui';
import { SearchPipe } from './utils';

const routes: Routes = [
  {
    path: '',
    component: ToDoListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToDosRoutingModule {
  public static Components: Array<Type<any> | any[]> = [
    ToDoListComponent,
    DateComponent,
    TodoFormGroupComponent,
    SearchPipe,
  ];
}
