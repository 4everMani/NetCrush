import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Movie } from 'src/app/models/movie';
import { MovieModule } from '../movie.module';

import { MovieInfoComponent } from './movie-info.component';

describe('MovieInfoComponent', () => {
  let component: MovieInfoComponent;
  let fixture: ComponentFixture<MovieInfoComponent>;
  let el: DebugElement;
  const movie = new Movie({
    id: '2',
    title: "The Godfather",
    description: "From the wise guys of Goodfellas to The Sopranos, all crime dynasties that came after The Godfather are descendants of the Corleones: Francis Ford Coppola’s magnum opus is the ultimate.",
    imdbRating: "9.5",
    language: "English",
    genre: "Thrille",
    imageURL: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    youtubeURL: "https://www.youtube.com/embed/sY1S34973zA",
    isPrimeMovie: true
  });


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieModule]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(MovieInfoComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      fixture.detectChanges();
    })
    
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the movie-title', () => {
    component.movie = movie;
    fixture.detectChanges();
    const title = el.query(By.css(".title"));
    expect(title).toBeTruthy("Could not find movie");
    expect(title.nativeNode.textContent).toBe(movie.title)

  })

  it('should display the movie-genre', () => {
    component.movie = movie;
    fixture.detectChanges();
    const genre = el.query(By.css(".type"));
    expect(genre).toBeTruthy("Could not find movie");
    expect(genre.nativeNode.textContent).toBe(movie.genre)

  })

  it('should display the movie-image', () => {
    component.movie = movie;
    fixture.detectChanges();
    const image = el.query(By.css("img"));
    expect(image).toBeTruthy("Could not find movie");
    expect(image.nativeNode.src).toBe(movie.imageURL)
  })

  it('should display the movie-language', () => {
    component.movie = movie;
    fixture.detectChanges();
    const language = el.query(By.css(".mt-2"));
    expect(language).toBeTruthy("Could not find movie");
    expect(language.nativeNode.textContent).toBe(movie.language)
  })

  it('should display the movie-description', () => {
    component.movie = movie;
    fixture.detectChanges();
    const description = el.query(By.css(".description"));
    expect(description).toBeTruthy("Could not find movie");
    expect(description.nativeNode.textContent).toBe("Summery: "+movie.description?.slice(0,90)?.concat('...'))
  })

  it('should display the movie-rating', () => {
    component.movie = movie;
    fixture.detectChanges();
    const rating = el.query(By.css(".rating h5"));
    expect(rating).toBeTruthy("Could not find movie");
    expect(rating.nativeNode.textContent).toBe(movie.imdbRating);
  })
});
