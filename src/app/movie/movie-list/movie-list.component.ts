import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { IMovie } from '../../interfaces/i-movie';
import { MovieFacade } from '../store/movie.facade';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  public movies$ = this.movieFacade.movies$;

  constructor(private readonly movieFacade: MovieFacade) { }

  ngOnInit(): void {
    
  }

}
