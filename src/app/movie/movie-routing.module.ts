import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGurad } from '../services/auth.guard';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
  {
    path: "",
    component: MovieListComponent
  },
  {
    path: ":id",
    canActivate: [AuthGurad],
    component: WatchComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthGurad
  ]
})
export class MovieRoutingModule { }
