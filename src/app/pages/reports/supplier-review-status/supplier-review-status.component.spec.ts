import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierReviewStatusComponent } from './supplier-review-status.component';

describe('SupplierReviewStatusComponent', () => {
  let component: SupplierReviewStatusComponent;
  let fixture: ComponentFixture<SupplierReviewStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierReviewStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierReviewStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
