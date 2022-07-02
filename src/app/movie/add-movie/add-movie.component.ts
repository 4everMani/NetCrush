import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IMovie } from 'src/app/interfaces/i-movie';
import { MovieFacade } from '../store/movie.facade';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  constructor(private readonly movieFacade: MovieFacade) { }

  ngOnInit(): void {
  }

  public onAddMovie(data: NgForm): void{
    console.log(data.value as IMovie)
    this.movieFacade.addMovie(data.value as IMovie)
  }

}
