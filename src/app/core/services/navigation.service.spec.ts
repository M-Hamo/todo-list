import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

import { NavigationService } from './navigation.service';
import { AppComponent } from 'src/app/app.component';

describe('Service: NavigationService', () => {
  let navigationService!: NavigationService, router!: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            redirectTo: '/products',
            pathMatch: 'full',
          },
          {
            path: 'products',
            component: AppComponent, // Just for testing
          },
          {
            path: 'dashboard',
            component: AppComponent,
          },
          {
            path: 'users',
            component: AppComponent,
          },
        ]),
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [Router],
    });

    navigationService = TestBed.inject(NavigationService);

    router = TestBed.inject(Router);
  });

  it('should create a service', () => expect(navigationService).toBeTruthy());

  it('should have have History if we navigate to another components', fakeAsync(() => {
    router.navigate(['/']);
    tick();
    router.navigate(['/products']);
    tick();
    router.navigate(['/dashboard']);
    tick();
    router.navigate(['/']);
    tick();

    expect(navigationService.history()).toEqual(['/products', '/dashboard']);
    expect(navigationService.hasHistory()).toBeTruthy();
  }));

  it('should Back to latest path when call back()', fakeAsync(() => {
    router.navigate(['/products']);
    tick();
    router.navigate(['/dashboard']);
    tick();

    navigationService.back();

    expect(navigationService.hasHistory()).toBeFalse();
    expect(navigationService.history()).toEqual(['/products']);
  }));
});
