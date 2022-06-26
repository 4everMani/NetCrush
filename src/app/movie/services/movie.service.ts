import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { IMovie } from 'src/app/interfaces/i-movie';
import { environment } from '../../../environments/environment';

@Injectable()
export class MovieService {

  private store:IMovie[] = []
  
  constructor(private http: HttpClient) { }

  public getAllMovies(): Observable<IMovie[]>{
    return this.http.get<any>(`${environment.apiEndpoint}movies`)
            .pipe(
              tap(movies => this.store = movies)
            );
  }

  public getMovieById(id: number): IMovie[] {
    console.log(this.store)
    return this.store.filter(movie => movie.id === id);
    
  }
}
