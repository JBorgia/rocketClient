import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartReviewComponent } from './part-review.component';

describe('PartReviewComponent', () => {
  let component: PartReviewComponent;
  let fixture: ComponentFixture<PartReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
