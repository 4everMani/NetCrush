import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MovieService } from '../services/movie.service';

class MovieData {
  movies?: Movie[] = [];
  watchLater?: Movie[] = [];
}

@Injectable({
  providedIn: 'root',
})
export class MovieFacade {
  private movieCollectionState = new MovieData();

  private movieSubject = new BehaviorSubject<MovieData>(
    this.movieCollectionState
  );

  private dispatchMovieCollectionState$ = this.movieSubject.asObservable();

  public movies$ = this.dispatchMovieCollectionState$.pipe(
    map((data) => {
      return data.movies;
    }),
    distinctUntilChanged()
  );

  public watchLaterMovies$ = this.dispatchMovieCollectionState$.pipe(
    map((data) => {
      return data.watchLater;
    }),
    distinctUntilChanged()
  );

  constructor(private readonly movieService: MovieService) {
    console.log('constructor');
  }

  public getMoviesById(id: string | null): Observable<Movie | undefined> {
    if (
      this.movieCollectionState.movies !== undefined &&
      this.movieCollectionState.movies.length === 0
    ) {
      this.getAllMovies();
    }
    return this.movies$.pipe(
      map((data) => data?.filter((movie) => movie.id === id)[0])
    );
  }

  public getAllMovies(): Observable<Movie[] | undefined> {
    const movies = this.movieSubject.getValue().movies;
    if (movies !== undefined && movies.length === 0) {
      this.movieService.getAllMovies().subscribe((data: Movie[]) => {
        this.updateState({ ...this.movieCollectionState, movies: data });
      });
    }
    return this.movies$.pipe(shareReplay());
  }

  public updateState(state: MovieData) {
    this.movieCollectionState = state;
    this.movieSubject.next(state);
    const a = this.movieSubject.getValue();
  }

  // public getWatchLaterMovies(): Observable<IMovie[]> {
  //     // this.watchLaterMovies$.subscribe(console.log)
  //     if (this.initialState.watchLater.length === 0){

  //     }
  //     return this.watchLaterMovies$;
  // }

  public addToWatchLater(movie: Movie): void {
    this.movieCollectionState.watchLater?.push(movie);
    this.updateState({
      ...this.movieCollectionState,
      watchLater: this.movieCollectionState.watchLater,
    });
  }
}
