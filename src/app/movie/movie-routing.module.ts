import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGurad } from '../services/auth.guard';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MyStuffComponent } from './my-stuff/my-stuff.component';
import { WatchLaterComponent } from './watch-later/watch-later.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
  {
    path: "",
    component: MovieListComponent
  },
  {
    path: "movies/:id",
    canActivate: [AuthGurad],
    component: WatchComponent
  },
  {
    path: "mystuff",
    canActivate: [AuthGurad],
    component: MyStuffComponent,
    // children: [
    //   {
    //     path: "watchlist",
    //     component: WatchListComponent
    //   },
    //   {
    //     path: "favourite",
    //     component: FavouriteComponent
    //   }
    // ]
  },
  {
    path: "addMovie",
    component: AddMovieComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthGurad
  ]
})
export class MovieRoutingModule { }
