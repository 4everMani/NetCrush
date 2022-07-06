import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { map, Observable, switchAll, switchMap } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { AuthFacade } from 'src/app/store/auth.facade';
import { IMovie } from '../../interfaces/i-movie';
import { PrimeActivateComponent } from '../prime-activate/prime-activate.component';
import { MovieService } from '../services/movie.service';
import { MovieFacade } from '../store/movie.facade';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {

  /**
   * Input property to hold a movie data
   */
  @Input() movie?: Movie;

  /**
   * Observable property to hold data which shows a movie is in watch later section or not.
   */
  public watchLater$!: Observable<boolean>;

  /**
   * Observable property to hold data which shows a movie is in favourote section or not.
   */
  public favourite$!: Observable<boolean>;

  /**
   * Property which indicates that user is prime user or not
   */
  private isPrimeUser = false;

  constructor(
    private readonly movieFacade: MovieFacade,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
    public authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    if (this.movie?.id) {
      this.watchLater$ = this.movieFacade.isWatchLaterMovie(this.movie.id);
      this.favourite$ = this.movieFacade.isFavouriteMovie(this.movie.id);
    }
    this.movieFacade.isUserPrime().subscribe((res) => this.isPrimeUser = res);
  }

  /**
   * adding or removing a movie from watch later
   * @param data 
   */
  public addToWatchLater(data: boolean): void {
    if (this.movie && data) {
      this.movieFacade.addToWatchLater(this.movie);
    } else if (this.movie?.id && !data) {
      this.movieFacade.removeFromWatchLater(this.movie.id);
    }
  }

  /**
   * adding or removing a movie from favourite
   * @param data 
   */
  public addToFavourite(data: boolean): void {
    if (this.movie && data) {
      this.movieFacade.addToFav(this.movie);
    } else if (this.movie?.id && !data) {
      this.movieFacade.removeFav(this.movie.id);
    }
  }

  /**
   * 
   * @param movie On selecting a movie
   */
  public onMovieSelect(movie: Movie): void {
    if (movie.isPrimeMovie && !this.isPrimeUser) {
      this.matDialog
        .open(PrimeActivateComponent)
        .afterClosed()
        .pipe(switchMap((res: boolean) => this.movieFacade.addPrimeMember(res)))
        .subscribe((res) => {
          if (res) {
            this.router.navigateByUrl(`/movies/${movie.id}`);
          }
        });
    } else {
      this.router.navigateByUrl(`/movies/${movie.id}`);
    }
  }
}
