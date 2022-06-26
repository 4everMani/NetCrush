import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IMovie } from '../../interfaces/i-movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {

  @Input() movie!: IMovie

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

}
