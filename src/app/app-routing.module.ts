import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContainerComponent } from './layout/container/container.component';
import { HeaderComponent } from './layout/header/header.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'to-do',
    pathMatch: 'full',
  },
  {
    path: 'to-do',
    component: ContainerComponent,
    title: 'To-Do List',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./to-dos/to-dos.module').then((m) => m.ToDosModule),
        pathMatch: 'full',
      },
    ],
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
  public static Components: Array<Type<any> | any[]> = [
    AppComponent,
    ContainerComponent,
    HeaderComponent,
  ];
}
