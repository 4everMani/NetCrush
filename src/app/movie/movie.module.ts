import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieService } from './services/movie.service';
import { MovieFacade } from './store/movie.facade';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MovieItemComponent,
    MovieListComponent,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    HttpClientModule
    
  ],
  providers: [
    MovieService,
    MovieFacade,
  ]
})
export class MovieModule { }
