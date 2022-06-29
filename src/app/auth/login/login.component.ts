import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from 'src/app/interfaces/i-user';
import { AuthService } from 'src/app/services/auth.service';
import { AuthFacade } from 'src/app/store/auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly authFacade: AuthFacade) { }

  ngOnInit(): void {
  }

  public onSignIn(form: NgForm): void {
    this.authFacade.loginAccount(form.value as IUser)
  }
}
