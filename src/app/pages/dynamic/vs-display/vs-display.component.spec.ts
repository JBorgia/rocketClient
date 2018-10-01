import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VsDisplayComponent } from './vs-display.component';

describe('VsDisplayComponent', () => {
  let component: VsDisplayComponent;
  let fixture: ComponentFixture<VsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
