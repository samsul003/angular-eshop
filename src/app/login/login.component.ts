import { AuthService } from '../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {}

  login() {
    this.auth.login();
  }
}
