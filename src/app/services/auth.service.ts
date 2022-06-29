import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { IUser } from '../interfaces/i-user';
import { AuthFacade } from '../store/auth.facade';
import {UserCredential} from '@firebase/auth-types';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private afAuth: AngularFireAuth) {
   }


  public signup(data: IUser): Promise<UserCredential>{
    return this.afAuth.createUserWithEmailAndPassword(data.email,data.password);
  }

  public login(data: IUser): Promise<UserCredential>{
    console.log(data)
    return this.afAuth.signInWithEmailAndPassword(data.email,data.password);
  }

  public logout(): Promise<void>{
    return this.afAuth.signOut();
  }

}
