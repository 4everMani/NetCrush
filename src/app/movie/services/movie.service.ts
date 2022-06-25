import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IMovie } from 'src/app/interfaces/i-movie';
import { environment } from '../../../environments/environment';

@Injectable()
export class MovieService {

  
  constructor(private http: HttpClient) { }

  public getAllMovies(): Observable<IMovie[]>{
    return this.http.get<any>(`${environment.apiEndpoint}movies`);
  }
}
