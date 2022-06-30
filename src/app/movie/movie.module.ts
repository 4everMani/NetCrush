import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieService } from './services/movie.service';
import { MovieFacade } from './store/movie.facade';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { SearchComponent } from './search/search.component';
import { WatchComponent } from './watch/watch.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewComponent } from './review/review.component';
import { ScreenPlayerComponent } from './screen-player/screen-player.component';
import { SafePipe } from './utilities/safe.pipe';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MyStuffComponent } from './my-stuff/my-stuff.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { FavouriteComponent } from './favourite/favourite.component';

@NgModule({
  declarations: [
    MovieItemComponent,
    MovieListComponent,
    SearchComponent,
    WatchComponent,
    ReviewListComponent,
    ReviewComponent,
    ScreenPlayerComponent,
    SafePipe,
    MovieInfoComponent,
    MyStuffComponent,
    WatchListComponent,
    FavouriteComponent,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    HttpClientModule,
    MaterialModule,
    AngularFirestoreModule,
    
  ],
  providers: [
    MovieService,
    // MovieFacade,
  ]
})
export class MovieModule { }
