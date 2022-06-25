import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public maxDate = new Date();

  constructor() { }

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  public onSubmit(form: NgForm): void {
    console.log(form)
  }

}
