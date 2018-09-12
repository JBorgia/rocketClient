import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPartsFormComponent } from './search-parts-form.component';

describe('FormComponent', () => {
  let component: SearchPartsFormComponent;
  let fixture: ComponentFixture<SearchPartsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPartsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPartsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
