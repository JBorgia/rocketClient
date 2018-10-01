import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteboardNotesComponent } from './whiteboard-notes.component';

describe('WhiteboardNotesComponent', () => {
  let component: WhiteboardNotesComponent;
  let fixture: ComponentFixture<WhiteboardNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteboardNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteboardNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
