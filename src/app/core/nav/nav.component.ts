import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/i-user';
import { AuthFacade } from 'src/app/store/auth.facade';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public readonly authFacade: AuthFacade) { }

  ngOnInit(): void {
  }

  public onLogout(): void {
    this.authFacade.logoutUser();
  }

  public onFavClick(): void {
    
  }

}
