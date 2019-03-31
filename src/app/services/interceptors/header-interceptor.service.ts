import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerOptions = new HttpHeaders({
      'Authorization': 'Iron_Man_3.3'
    });

    const authReq = req.clone({
      headers: headerOptions
    });

    return next.handle(authReq);
  }
}
