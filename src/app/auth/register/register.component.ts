import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from 'src/app/interfaces/i-user';
import { AuthFacade } from 'src/app/store/auth.facade';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  /**
   * will contain max date.
   */
  public maxDate = new Date();

  constructor(private readonly authFacade: AuthFacade) { }

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  /**
   * Performing SignUp Operation
   * @param form 
   */
  public onSubmit(form: NgForm): void {
    this.authFacade.createAccount(form.value as IUser)
  }

}
