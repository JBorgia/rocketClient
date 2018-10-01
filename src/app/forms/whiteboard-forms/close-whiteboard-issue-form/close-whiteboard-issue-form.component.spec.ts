import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseWhiteboardIssueFormComponent } from './close-whiteboard-issue-form.component';

describe('CloseWhiteboardIssueFormComponent', () => {
  let component: CloseWhiteboardIssueFormComponent;
  let fixture: ComponentFixture<CloseWhiteboardIssueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseWhiteboardIssueFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseWhiteboardIssueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
