import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReCaptchaEnterpriseProvider } from '@angular/fire/app-check';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { stringify } from '@firebase/util';
import { concatMap, from, map, Observable, of, shareReplay, Subject, Subscription, take, tap } from 'rxjs';
import { IComment } from 'src/app/interfaces/i-comment';
import { IMovie } from 'src/app/interfaces/i-movie';
import { IWatchLater } from 'src/app/interfaces/i-watch-later';
import { Favourite } from 'src/app/models/favourite';
import { Movie } from 'src/app/models/movie';
import { WatchLater } from 'src/app/models/watch-later';
import { AuthFacade } from 'src/app/store/auth.facade';

interface PrimeUser{
  email: string;
}

@Injectable()
export class MovieService {

  private store:IMovie[] = []

  private emailSubscription!: Subscription;

  private email?: string;

  private name?: string;
  
  constructor(private userfacade: AuthFacade,
              private db: AngularFirestore,
              private router: Router) {
    this.emailSubscription = this.userfacade.user$.subscribe(user => {
      this.email = user?.email;
      this.name = user?.firstName;
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

  public addMovieToLibrary(movie: IMovie): void{
    this.db.collection<IMovie>('movies').add(movie)
            .then(() => {
              this.router.navigateByUrl('/movies')
            })
  }

  public addCommentToDb(data: IComment): void{
    data.commentedBy = this.name;
    this.db.collection<IComment>('comments').add(data);
  }

  public getComment(movieId: string): Observable<IComment[]>{
      return this.db.collection<IComment>('comments', ref => ref.where('movieId', '==', movieId)).valueChanges()
      .pipe(shareReplay());
  }

  public addPrimeCustomer(): Observable<boolean>{
    if (this.email){
      const data: PrimeUser = {
        email: this.email
      }
      return from(this.db.collection<PrimeUser>('prime_users').add(data).then(()=> true))
    }
    return of(false)
  }

  public isUserPrime(): Observable<boolean> {
    if (this.email){
      return this.db.collection<PrimeUser>('prime_users', ref => ref.where('email', '==', this.email)).valueChanges()
      .pipe(
        tap(res => console.log('res',res)),
        map(res => res.length === 0 ? false : true),

      );
    }
    return of(false)
  }


  ngOnDestroy(): void {
    this.emailSubscription.unsubscribe();
    
  }

  
}
