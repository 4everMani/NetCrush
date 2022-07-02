import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public onAddMovie(data: NgForm): void{
    console.log(data.value)
  }

}
