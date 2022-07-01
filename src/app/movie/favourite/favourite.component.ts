import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MovieFacade } from '../store/movie.facade';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  public favMovies$!: Observable<Movie[] | undefined>

  constructor(private readonly moviefacade: MovieFacade) { }

  ngOnInit(): void {
    this.favMovies$ = this.moviefacade.getAllFavuoriteMovies();
  }

}
