import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWhiteboardIssueFormComponent } from './create-whiteboard-issue-form.component';

describe('FormComponent', () => {
  let component: CreateWhiteboardIssueFormComponent;
  let fixture: ComponentFixture<CreateWhiteboardIssueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWhiteboardIssueFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWhiteboardIssueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
