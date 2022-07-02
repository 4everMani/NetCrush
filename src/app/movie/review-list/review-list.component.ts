import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from 'src/app/interfaces/i-comment';
import { Movie } from 'src/app/models/movie';
import { MovieFacade } from '../store/movie.facade';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  @Input() movie?: Movie;

  public comment: string = '';

  public comments$!: Observable<IComment[] | undefined>;


  constructor(private readonly movieFacade: MovieFacade) { }


  ngOnInit(): void {
    if (this.movie && this.movie.id){
      this.comments$ = this.movieFacade.getCommentByMovieId(this.movie.id);
    }
  }

  public onSubmit(): void{
    if (this.movie && this.movie.id){
      this.movieFacade.addComment(this.comment, this.movie.id);
      this.comment = '';
    }
  }

}
