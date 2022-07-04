import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieService } from './services/movie.service';
import { MovieFacade } from './store/movie.facade';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { WatchLaterComponent } from './watch-later/watch-later.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { FormsModule } from '@angular/forms';
import { PrimeActivateComponent } from './prime-activate/prime-activate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n', '.json')
}

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
    WatchLaterComponent,
    FavouriteComponent,
    AddMovieComponent,
    PrimeActivateComponent
  ],
  entryComponents: [PrimeActivateComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MovieRoutingModule,
    HttpClientModule,
    MaterialModule,
    AngularFirestoreModule,
    FormsModule,
    // BrowserAnimationsModule
    
  ],
  providers: [
    MovieService,
    // MovieFacade,
  ]
})
export class MovieModule { }
