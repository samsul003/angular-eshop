import { UserService } from './services/user.service';
import { AuthService } from './services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    route: Router,
    private userService: UserService,
    private auth: AuthService) {

    this.auth.user$.subscribe(user => {
      if (!user) return;

      this.userService.save(user);

      let targetRoute = localStorage.getItem('returnUrl');
      if (!targetRoute) return;

      localStorage.removeItem('returnUrl');
      route.navigateByUrl(targetRoute);
    });
  }
}
