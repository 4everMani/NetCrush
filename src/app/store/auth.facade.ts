import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/i-user';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from '@firebase/auth-types';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthFacade {
  private loginSubject = new BehaviorSubject<IUser | undefined>(undefined);

  public user$ = this.loginSubject.asObservable();

  constructor(
    private readonly authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  /**
   * Sign Up
   * @param data 
   */
  public createAccount(data: IUser): void {
    this.authService
      .signup(data)
      .then((res) => {
        res.user?.updateProfile({
          displayName: data.firstName + ' ' + data.lastName,
        });
      })
      .then(() => {
        this.afAuth.authState.subscribe((user) => {
          this.storeUser(user);
          return user;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  /**
   * Login method
   * @param data 
   */
  public loginAccount(data: IUser): void {
    this.authService.login(data)
    .then(res => {
        this.storeUser(res.user)
        this.router.navigateByUrl("/movies");
      });
  }

  /**
   * 
   * @param user To store user
   */
  private storeUser(user: User | null): void {
    if (user && user?.email !== null && user.displayName !== null) {
      const loggedinUser: IUser = {
        email: user.email,
        password: '',
        firstName: user.displayName,
      };
      this.loginSubject.next(loggedinUser);
    }
  }

  public logoutUser(): void{
    this.authService.logout()
    .then(() =>{
        this.loginSubject.next(undefined);
        this.router.navigateByUrl("/login");
    });
  }

  public initAuthentication(): Observable<boolean>{
    console.log('initialization')
    return this.afAuth.authState
        .pipe(
            tap(user => this.storeUser(user)),
            map(user => user ? true : false)
        )
  }
}
