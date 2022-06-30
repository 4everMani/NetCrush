import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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

  constructor(private readonly movieFacade: MovieFacade) { }

  ngOnInit(): void {
  }

  public addToWatchLater(): void{
    if (this.movie){
      this.movieFacade.addToWatchLater(this.movie)
    }
  }

}
