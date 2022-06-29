import { Component } from '@angular/core';
import { AuthFacade } from './store/auth.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authFacade: AuthFacade){
    this.authFacade.initAuthentication().subscribe()
  }
}
