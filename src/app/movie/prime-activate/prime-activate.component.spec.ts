import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeActivateComponent } from './prime-activate.component';

describe('PrimeActivateComponent', () => {
  let component: PrimeActivateComponent;
  let fixture: ComponentFixture<PrimeActivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeActivateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
