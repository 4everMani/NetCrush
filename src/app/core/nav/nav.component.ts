import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/aap-constants';
import { IUser } from 'src/app/interfaces/i-user';
import { MovieFacade } from 'src/app/movie/store/movie.facade';
import { AuthFacade } from 'src/app/store/auth.facade';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public admin = Admin;

  constructor(public readonly authFacade: AuthFacade,
              private readonly movieFacade: MovieFacade,
              private readonly router: Router) { }

  ngOnInit(): void {
  }

  public onLogout(): void {
    this.authFacade.logoutUser();
  }

  public onSelect(category: string): void {
    this.router.navigateByUrl('/movies');
    this.movieFacade.getSearchResult(category);
  }

  public navigateToHome(): void{
    this.movieFacade.setSearchState();
    this.router.navigateByUrl('/movies');
  }

}
