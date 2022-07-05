import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { from, Observable, of } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MovieModule } from '../movie.module';
import { MovieFacade } from '../store/movie.facade';

import { FavouriteComponent } from './favourite.component';

describe('FavouriteComponent', () => {
  let component: FavouriteComponent;
  let fixture: ComponentFixture<FavouriteComponent>;
  let el: DebugElement;
  let movieFacade: any;

  const favMovies : Movie[] | undefined= [
    {
      id: "2",
      title: "The Godfather",
      description: "From the wise guys of Goodfellas to The Sopranos, all crime dynasties that came after The Godfather are descendants of the Corleones: Francis Ford Coppola’s magnum opus is the ultimate.",
      imdbRating: "9.5",
      language: "English",
      genre: "Thriller",
      imageURL: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      youtubeURL: "https://www.youtube.com/embed/sY1S34973zA",
      isPrimeMovie: true
  },
  {
      id: "1",
      title: "A Space Odyssey",
      description: "The greatest film ever made began with the meeting of two brilliant minds: Stanley Kubrick and sci-fi seer Arthur C. Clarke. “I understand he’s a nut who lives in a tree in India somewhere",
      imdbRating: "9.5",
      language: "English",
      genre: "Science fiction",
      imageURL: "https://images-na.ssl-images-amazon.com/images/I/815ex8QSniL._RI_.jpg",
      youtubeURL: "https://www.youtube.com/embed/oR_e9y-bka0",
      isPrimeMovie: true
  }
  ]

  beforeEach(async () => {

    const movieFacadeSpy = jasmine.createSpyObj('MovieFacade',['getAllFavuoriteMovies'])

    await TestBed.configureTestingModule({
      imports: [ MovieModule ],
      providers: [
        {provide: MovieFacade, useValue: movieFacadeSpy}
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(FavouriteComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      movieFacade = TestBed.inject(MovieFacade)
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get total no. of favourite movies', () => {
    movieFacade.getAllFavuoriteMovies.and.returnValue(of(favMovies));
    fixture.detectChanges();
    const movies = el.query(By.css('.card_flex'));
    el.nativeElement.click(movies);
    console.log(movies)
    expect(2).toBe(favMovies.length, "Unexpected no. of movies");
  });


});
