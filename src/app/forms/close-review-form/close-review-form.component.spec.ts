import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseReviewFormComponent } from './close-review-form.component';

describe('CloseReviewFormComponent', () => {
  let component: CloseReviewFormComponent;
  let fixture: ComponentFixture<CloseReviewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseReviewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
