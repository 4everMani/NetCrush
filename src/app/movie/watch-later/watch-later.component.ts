import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/interfaces/i-movie';
import { Movie } from 'src/app/models/movie';
import { MovieFacade } from '../store/movie.facade';

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.scss']
})
export class WatchLaterComponent implements OnInit {

  public watchLaterMovies$!: Observable<Movie[] | undefined>

  constructor(private readonly moviefacade: MovieFacade) { }

  ngOnInit(): void {
    this.watchLaterMovies$ = this.moviefacade.watchLaterMovies$;
  }

}
