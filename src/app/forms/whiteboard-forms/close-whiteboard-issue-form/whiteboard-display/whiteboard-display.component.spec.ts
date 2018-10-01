import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteboardDisplayComponent } from './whiteboard-display.component';

describe('WhiteboardDisplayComponent', () => {
  let component: WhiteboardDisplayComponent;
  let fixture: ComponentFixture<WhiteboardDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteboardDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteboardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
