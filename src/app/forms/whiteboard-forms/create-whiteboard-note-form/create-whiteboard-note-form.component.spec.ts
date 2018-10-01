import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWhiteboardNoteFormComponent } from './create-whiteboard-note-form.component';

describe('FormComponent', () => {
  let component: CreateWhiteboardNoteFormComponent;
  let fixture: ComponentFixture<CreateWhiteboardNoteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWhiteboardNoteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWhiteboardNoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
