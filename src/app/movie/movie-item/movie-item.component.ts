import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { IMovie } from '../../interfaces/i-movie';
import { MovieService } from '../services/movie.service';
import { MovieFacade } from '../store/movie.facade';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {

  @Input() movie?: Movie

  public watchLater$!: Observable<boolean>;

  public favourite$!: Observable<boolean>

  constructor(private readonly movieFacade: MovieFacade) { }

  ngOnInit(): void {
    if (this.movie?.id){
      this.watchLater$ = this.movieFacade.isWatchLaterMovie(this.movie.id)
      this.favourite$ = this.movieFacade.isFavouriteMovie(this.movie.id)
    }
  }

  public addToWatchLater(data: boolean): void{
    if (this.movie && data){
      this.movieFacade.addToWatchLater(this.movie)
    }
    else if (this.movie?.id && !data){
      this.movieFacade.removeFromWatchLater(this.movie.id)
    }
  }

  public addToFavourite(data: boolean): void{
    if (this.movie && data){
      this.movieFacade.addToFav(this.movie)
    }
    else if (this.movie?.id && !data){
      this.movieFacade.removeFav(this.movie.id)
    }
  }

}
