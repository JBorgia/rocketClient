import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidReportComponent } from './rid-report.component';

describe('RidReportComponent', () => {
  let component: RidReportComponent;
  let fixture: ComponentFixture<RidReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
