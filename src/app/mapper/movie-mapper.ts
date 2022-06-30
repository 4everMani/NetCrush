import { IMovie } from "../interfaces/i-movie";
import { Movie } from "../models/movie";

export class MovieMapper{
    public static mapToModel(movie: IMovie): Movie{
        const movieModel = new Movie({
            id : movie.id,
            description : movie.description,
            genre : movie.genre,
            imageURL : movie.imageURL,
            imdbRating : movie.imdbRating,
            language : movie.language,
            youtubeURL : movie.youtubeURL,
            isPrimeMovie : movie.isPrimeMovie,
            title : movie.title
        })
        return movieModel;
    }
}