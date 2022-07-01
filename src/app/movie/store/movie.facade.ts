import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  debounce,
  debounceTime,
  distinctUntilChanged,
  from,
  map,
  Observable,
  of,
  shareReplay,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { Favourite } from 'src/app/models/favourite';
import { Movie } from 'src/app/models/movie';
import { WatchLater } from 'src/app/models/watch-later';
import { MovieService } from '../services/movie.service';

class MovieData {
  movies?: Movie[] = [];
  watchLater?: Movie[] = [];
  watchLaterData?: WatchLater[] = [];
  favouriteMovie?: Movie[] = [];
  favouriteData?: Favourite[] = [];
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

  public favouriteMovies$ = this.dispatchMovieCollectionState$.pipe(
    map((data) => {
      return data.favouriteMovie;
    }),
    distinctUntilChanged()
  );

  constructor(private readonly movieService: MovieService) {
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

  public getWatchLaterMovies(): Observable<Movie[] | undefined> {
      if (this.movieCollectionState.watchLater!== undefined &&
        this.movieCollectionState.watchLater.length === 0){
            return this.getAllMovies()
            .pipe(
                switchMap(movies => this.movieService.getWatchLaterMovies()),
                tap(data => this.updateState({...this.movieCollectionState, watchLaterData: data})),
                concatMap(data => this.addToMoviesSection(data)),
                tap(movies => this.updateState({...this.movieCollectionState, watchLater: movies})),
                shareReplay()
            )            
      }
      return this.watchLaterMovies$;
  }

  public addToWatchLater(movie: Movie): void {
    if (!this.movieCollectionState.watchLater?.includes(movie)){
        this.movieCollectionState.watchLater?.push(movie);
    this.updateState({
      ...this.movieCollectionState,
      watchLater: this.movieCollectionState.watchLater,
    });
    this.movieService.addWatchLater(movie.id);
    }
  }

  private addToMoviesSection(data: WatchLater[] | Favourite[]): Observable<Movie[]>{
    const movies = this.movieSubject.getValue().movies;
    const movieArr: Movie[] = [];
    if (movies){
        movies.forEach(movie => {
            data.forEach(element => {
                if (element.movieId === movie.id){
                    movieArr.push(movie)
                }
            });
        })
    }
    return of(movieArr)
  }

  public isWatchLaterMovie(movieId: string): Observable<boolean>{
    return this.getWatchLaterMovies()
            .pipe(
                map(movies => this.isMovieMatched(movies,movieId)),
                shareReplay()
            )
  }

  private isMovieMatched(movies: Movie[] | undefined, movieId: string): boolean{
    if (movies){
        return movies.find(movie => movie.id === movieId) ? true : false
    }
    return false
  }

  public removeFromWatchLater(movieId: string): void{
    const item = this.movieCollectionState.watchLaterData;
    if (item){
        item.forEach(data => {
            if (data.movieId === movieId){
                this.movieService.removeMovieFromWatchLater(data)  
            }
        })  
    }
  }


  public getAllFavuoriteMovies(): Observable<Movie[] | undefined>{
    if (this.movieCollectionState.favouriteMovie!== undefined &&
        this.movieCollectionState.favouriteMovie.length === 0){
            return this.getAllMovies()
            .pipe(
                switchMap(movies => this.movieService.getFavouriteMovieDetails()),
                tap(data => this.updateState({...this.movieCollectionState, favouriteData: data})),
                concatMap(data => this.addToMoviesSection(data)),
                tap(movies => this.updateState({...this.movieCollectionState, favouriteMovie: movies})),
                shareReplay()
            )            
      }
      return this.favouriteMovies$;
  }

  public isFavouriteMovie(movieId: string): Observable<boolean>{
    return this.getAllFavuoriteMovies()
            .pipe(
                map(movies => this.isMovieMatched(movies,movieId)),
                shareReplay()
            )
  }

  public addToFav(movie: Movie): void{
    if (!this.movieCollectionState.favouriteMovie?.includes(movie)){
        this.movieCollectionState.favouriteMovie?.push(movie);
    this.updateState({
      ...this.movieCollectionState,
      favouriteMovie: this.movieCollectionState.watchLater,
    });
    this.movieService.addToFavourite(movie.id);
    }
  }

  public removeFav(movieId: string): void{
    const item = this.movieCollectionState.favouriteData;
    if (item){
        item.forEach(data => {
            if (data.movieId === movieId){
                this.movieService.removeFavourite(data)  
            }
        })  
    }
  }

}
