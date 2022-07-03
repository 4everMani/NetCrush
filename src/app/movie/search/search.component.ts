import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, switchMap, tap } from 'rxjs';
import { MovieFacade } from '../store/movie.facade';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput', { static: true }) input?: ElementRef;

  constructor(private readonly mvoieFacade: MovieFacade) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('hello')
    fromEvent<any>(this.input?.nativeElement, 'keyup')
    .pipe(
        map(event => event.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        tap(search => this.mvoieFacade.getSearchResult(search))
    ).subscribe();
  }

}
