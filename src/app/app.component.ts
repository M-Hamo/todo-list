import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { LanguageService } from './core/services/language.service';
import { AppSplashScreenService } from './core/services/splash-screen.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  template: `<ng-progress></ng-progress>
    <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  public constructor(
    private readonly _router: Router,
    private readonly _splashScreen: AppSplashScreenService,
    private readonly _languageService: LanguageService
  ) {}

  private readonly _destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this._routerObserver();
  }

  // Watch router status
  private _routerObserver = (): void => {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        tap(() => {
          window.scrollTo(0, 0);
          this._splashScreen.hide();
        }),
        //Close subscription when component destroy
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  };
}
