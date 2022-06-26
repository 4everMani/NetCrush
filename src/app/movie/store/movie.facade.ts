import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IReview } from "src/app/interfaces/i-review";
import { IUser } from "src/app/interfaces/i-user";
import { IMovie } from "../../interfaces/i-movie";
import { MovieService } from "../services/movie.service";

interface IMovieData {
    movies: IMovie[],
    reviews: IReview[],
    user: IUser
}

@Injectable()
export class MovieFacade{

    private initialState: IMovieData[] = [] 

    private movieSubject = new BehaviorSubject<IMovieData[]>(this.initialState)

    constructor(private readonly movieService: MovieService){}

}