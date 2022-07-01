import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { concatMap, map, Observable, of, shareReplay, Subject, take, tap } from 'rxjs';
import { IMovie } from 'src/app/interfaces/i-movie';
import { IWatchLater } from 'src/app/interfaces/i-watch-later';
import { Movie } from 'src/app/models/movie';
import { WatchLater } from 'src/app/models/watch-later';
import { AuthFacade } from 'src/app/store/auth.facade';
import { environment } from '../../../environments/environment';

@Injectable()
export class MovieService {

  private store:IMovie[] = []
  
  constructor(private userfacade: AuthFacade, private db: AngularFirestore) {
   
   }

  public getAllMovies(): Observable<Movie[]>{
    return this.db.collection<Movie>('movies')
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

  public addWatchLater(movieId: string | undefined): void{
    if (movieId){
      let email : string | undefined = '';
      this.userfacade.user$.subscribe(user => {
        email = user?.email
      })

      const data: IWatchLater = {movieId: movieId, email: email}
      this.db.collection('watchLater').add(data);
    }
  }

  public getWatchLaterMovies(): Observable<WatchLater[]>{
    let email : string | undefined = '';
      this.userfacade.user$.subscribe(user => {
        email = user?.email
      })
      if (email){
        return this.db.collection<WatchLater>('watchLater', ref => ref.where('email', '==',email)).valueChanges();
      }
      const arr: WatchLater[] = []
      return of(arr)
} 

  public removeMovieFromWatchLater(watchLaterData:  WatchLater){
    console.log(watchLaterData)
    this.db.collection<WatchLater>('watchLater').snapshotChanges()
    .pipe(
      map(docArray => {
        return docArray.map(doc => {
          return {
            ...doc.payload.doc.data(),
            id: doc.payload.doc.id
          };
        });
      }),
      map(e => e.filter(i => i.movieId === watchLaterData.movieId && i.eamilId === watchLaterData.eamilId)),
      take(1)
     )
     .subscribe((data) => {
      if(data){
        const id = data[0].id;
        this.db.collection('watchLater').doc(id).delete();
      }
     })
    
  }

  
}
