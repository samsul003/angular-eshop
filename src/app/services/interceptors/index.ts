import { ErrorInterceptor } from './error-interceptor.service';
import { HeaderInterceptor } from "./header-interceptor.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';


export const httpInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
];
