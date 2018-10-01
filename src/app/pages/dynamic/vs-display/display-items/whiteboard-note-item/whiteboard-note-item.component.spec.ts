import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteboardNoteItemComponent } from './whiteboard-note-item.component';

describe('WhiteboardNoteItemComponent', () => {
  let component: WhiteboardNoteItemComponent;
  let fixture: ComponentFixture<WhiteboardNoteItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteboardNoteItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteboardNoteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
