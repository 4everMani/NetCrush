import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { IMovie } from 'src/app/interfaces/i-movie';
import { MovieService } from '../services/movie.service';
import { MovieFacade } from '../store/movie.facade';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {

  public movieDetails$!: Observable<IMovie>;
  
  constructor(private route: ActivatedRoute, private readonly movieFacade: MovieFacade) { }

  ngOnInit(): void {
    this.loadMovieDetails()
  }

  private loadMovieDetails(): void{
    const movieId =  this.route.snapshot.paramMap.get('id');
     this.movieDetails$ = this.movieFacade.getMoviesById(movieId);
  }
}
