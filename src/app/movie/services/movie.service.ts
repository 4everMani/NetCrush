import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, shareReplay, Subject, tap } from 'rxjs';
import { IMovie } from 'src/app/interfaces/i-movie';
import { environment } from '../../../environments/environment';

@Injectable()
export class MovieService {

  private store:IMovie[] = []
  
  constructor(private http: HttpClient, private db: AngularFirestore) { }

  public getAllMovies(): Observable<IMovie[]>{
    return this.db.collection<IMovie>('movies')
           .snapshotChanges()
           .pipe(
            map(docArray => {
              return docArray.map(doc => {
                return {
                  ...doc.payload.doc.data(),
                  id: doc.payload.doc.id
                };
              });
            })
           )
  }
}
