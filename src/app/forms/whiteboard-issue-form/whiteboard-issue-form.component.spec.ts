import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteboardIssueFormComponent } from './whiteboard-issue-form.component';

describe('FormComponent', () => {
  let component: WhiteboardIssueFormComponent;
  let fixture: ComponentFixture<WhiteboardIssueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteboardIssueFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteboardIssueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
