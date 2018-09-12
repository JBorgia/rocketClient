import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VsResultsComponent } from './vs-results.component';

describe('VsResultsComponent', () => {
  let component: VsResultsComponent;
  let fixture: ComponentFixture<VsResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VsResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
