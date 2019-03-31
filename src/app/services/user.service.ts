import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app'

@Injectable({ providedIn: "root" })
export class UserService {
  usersPath: string = "/users";

  constructor(private db: AngularFireDatabase) {}

  save(user: firebase.User) {
    const userRef = this.db.object(`${this.usersPath}/${user.uid}`);
    userRef.update({
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL
    });
  }

  get(uid: string): Observable<AppUser> {
    let userRef = this.db.object(`${this.usersPath}/${uid}`);
    let user = userRef.valueChanges();
    return user as Observable<AppUser>;
  }
}
