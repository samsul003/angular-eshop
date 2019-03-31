import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {}

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      map(user => {
        if (user) return true;
        this.router.navigate(["/login"], {
          queryParams: { returnUrl: state.url }});

        return false;
      })
    );
  }
}
