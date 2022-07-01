import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { concatMap, map, Observable, of, shareReplay, Subject, Subscription, take, tap } from 'rxjs';
import { IMovie } from 'src/app/interfaces/i-movie';
import { IWatchLater } from 'src/app/interfaces/i-watch-later';
import { Favourite } from 'src/app/models/favourite';
import { Movie } from 'src/app/models/movie';
import { WatchLater } from 'src/app/models/watch-later';
import { AuthFacade } from 'src/app/store/auth.facade';

@Injectable()
export class MovieService {

  private store:IMovie[] = []

  private emailSubscription!: Subscription;

  private email?: string;
  
  constructor(private userfacade: AuthFacade, private db: AngularFirestore) {
    this.emailSubscription = this.userfacade.user$.subscribe(user => {
      this.email = user?.email
    })
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
    if (movieId && this.email){
      const data: IWatchLater = {movieId: movieId, email: this.email}
      this.db.collection('watchLater').add(data);
    }
  }

  public getWatchLaterMovies(): Observable<WatchLater[]>{
    // let email : string | undefined = '';
    //   this.userfacade.user$.subscribe(user => {
    //     email = user?.email
    //   })
      if (this.email){
        return this.db.collection<WatchLater>('watchLater', ref => ref.where('email', '==',this.email)).valueChanges();
      }
      const arr: WatchLater[] = []
      return of(arr)
} 

  public removeMovieFromWatchLater(watchLaterData:  WatchLater):void {
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

  public addToFavourite(movieId: string | undefined): void{
    if (this.email && movieId){
      const data: Favourite = {eamilId: this.email, movieId:movieId};
      this.db.collection('favouriteMovies').add(data);
    }
  }

  public getFavouriteMovieDetails(): Observable<Favourite[]>{
    if (this.email){
      return this.db.collection<Favourite>('favouriteMovies', ref => ref.where('eamilId', '==',this.email)).valueChanges();
    }
    const arr: Favourite[] = []
    return of(arr)
  }

  public removeFavourite(favouriteData: Favourite){
    this.db.collection<WatchLater>('favouriteMovies').snapshotChanges()
    .pipe(
      map(docArray => {
        return docArray.map(doc => {
          return {
            ...doc.payload.doc.data(),
            id: doc.payload.doc.id
          };
        });
      }),
      map(e => e.filter(i => i.movieId === favouriteData.movieId && i.eamilId === favouriteData.eamilId)),
      take(1)
     )
     .subscribe((data) => {
      if(data){
        const id = data[0].id;
        this.db.collection('favouriteMovies').doc(id).delete();
      }
     })
  }


  ngOnDestroy(): void {
    this.emailSubscription.unsubscribe();
    
  }

  
}
