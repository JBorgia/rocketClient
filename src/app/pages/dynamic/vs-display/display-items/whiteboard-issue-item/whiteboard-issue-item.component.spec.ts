import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteboardIssueItemComponent } from './whiteboard-issue-item.component';

describe('WhiteboardIssueItemComponent', () => {
  let component: WhiteboardIssueItemComponent;
  let fixture: ComponentFixture<WhiteboardIssueItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteboardIssueItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteboardIssueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
