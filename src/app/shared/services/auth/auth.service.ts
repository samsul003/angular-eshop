import { UserService } from "../user/user.service";
import { AppUser } from "../../models/app-user";
import { Observable, of } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private angularFireAuth: AngularFireAuth
  ) {
    this.user$ = angularFireAuth.authState;
  }

  login() {
    this.storeReturnRoute();

    this.angularFireAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }

  private storeReturnRoute() {
    let targetRoute = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", targetRoute);
  }

  get appUser$(): Observable<AppUser> {
    let userToTransform = this.user$;
    return userToTransform.pipe(
      switchMap(user => {
        if (user) return this.userService.get(user.uid);

        return of<AppUser>(null);
      })
    );
  }
}
