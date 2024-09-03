import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLogedComponent } from './header-loged.component';

describe('HeaderLogedComponent', () => {
  let component: HeaderLogedComponent;
  let fixture: ComponentFixture<HeaderLogedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLogedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderLogedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
