import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'to-do',
    pathMatch: 'full',
  },
  {
    path: 'to-do',
    // component: ForbiddenComponent,
    title: 'To-Do List',
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  public static Components: Array<Type<any> | any[]> = [AppComponent];
}
