import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from 'src/app/interfaces/i-movie';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {

  @Input() movie!: IMovie

  constructor() { }

  ngOnInit(): void {
  }

}
