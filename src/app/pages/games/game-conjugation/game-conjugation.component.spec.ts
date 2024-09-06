import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameConjugationComponent } from './game-conjugation.component';

describe('GameConjugationComponent', () => {
  let component: GameConjugationComponent;
  let fixture: ComponentFixture<GameConjugationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameConjugationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameConjugationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
