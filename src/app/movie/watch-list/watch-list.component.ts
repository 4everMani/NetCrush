import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/interfaces/i-movie';
import { Movie } from 'src/app/models/movie';
import { MovieFacade } from '../store/movie.facade';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {

  public watchLaterMovies$!: Observable<Movie[] | undefined>

  constructor(private readonly moviefacade: MovieFacade) { }

  ngOnInit(): void {
    this.watchLaterMovies$ = this.moviefacade.watchLaterMovies$;
  }

}
