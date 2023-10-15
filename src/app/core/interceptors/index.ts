import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptorService } from './error-interceptor.service';

/** Http interceptor providers in outside-in order */
export const HttpInterceptorsProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true,
  },
];
