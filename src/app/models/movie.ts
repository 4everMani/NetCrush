export class Movie{
    public id?: string;
    public title?: string;
    public description?: string;
    public imdbRating?: string;
    public language?: string;
    public genre?: string;
    public imageURL?: string;
    public youtubeURL?: string;
    public isPrimeMovie?: boolean;

    constructor(x: Movie){
        this.id = x.id;
        this.title = x.title;
        this.description = x.description;
        this.imdbRating = x.imdbRating;
        this.language = x.language;
        this.imageURL = x.imageURL;
        this.youtubeURL = x.youtubeURL;
        this.isPrimeMovie = x.isPrimeMovie;
        this.genre = x.genre;
    }

}