import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { IMovie } from 'src/app/interfaces/i-movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {

  public movieDetails$!: Observable<IMovie>

  public movie!: IMovie;
  constructor(private route: ActivatedRoute, private readonly movieService: MovieService) { }

  ngOnInit(): void {
    console.log("hello");
    this.loadMovieDetails()
  }

  private loadMovieDetails(): void{
    const result = this.movieService.getMovieById(0);
    this.movie = result[0]
    console.log(this.movie)
  }
}
