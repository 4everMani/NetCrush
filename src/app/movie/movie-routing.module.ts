import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieListComponent } from './movie-list/movie-list.component';

const routes: Routes = [
  {
    path: "",
    component: MovieListComponent
  },
  {
    path: ":id",
    component: MovieItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }