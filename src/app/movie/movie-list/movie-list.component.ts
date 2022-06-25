import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { IMovie } from '../../interfaces/i-movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  public movies$ = new Observable<IMovie[]>;

  constructor(private readonly movieService: MovieService) { }

  ngOnInit(): void {
    
    this.movies$ = this.movieService.getAllMovies();
  }

}
