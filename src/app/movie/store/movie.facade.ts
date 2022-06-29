import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { IReview } from "src/app/interfaces/i-review";
import { IUser } from "src/app/interfaces/i-user";
import { IMovie } from "../../interfaces/i-movie";
import { MovieService } from "../services/movie.service";

interface IMovieData {
    movies: IMovie[],
}

@Injectable()
export class MovieFacade{

    private initialState: IMovieData = {movies: []}

    private movieSubject = new BehaviorSubject<IMovieData>(this.initialState)

    public movies$ = this.movieSubject.asObservable()
                    .pipe(
                        map(data => data.movies)
                    );

    constructor(private readonly movieService: MovieService){
        this.getAllMovies()
        
    }

    public getMoviesById(id: string | null): Observable<IMovie> {
        if (this.initialState.movies.length === 0){
            this.getAllMovies();
        }
        return this.movies$
                .pipe(
                    map(data => data.filter(movie => movie.id === id)[0])
                );
        
    }

    private getAllMovies(): void{
        this.movieService.getAllMovies().
        subscribe((data: IMovie[]) => {
            this.initialState.movies = data;
            this.movieSubject.next(this.initialState);
            // console.log(data)
        })
    }

    updateState(state: IMovieData){
        console.log('state called')
        this.movieSubject.next(state);
    }

}