import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/interfaces/i-comment';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  /**
   * Input property  to hold a comment
   */
  @Input() comment?: IComment;

  constructor() { }

  ngOnInit(): void {
  }

}
