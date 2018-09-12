import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCloseFormComponent } from './review-close-form.component';

describe('ReviewCloseFormComponent', () => {
  let component: ReviewCloseFormComponent;
  let fixture: ComponentFixture<ReviewCloseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewCloseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCloseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
