import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCloseFormComponent } from './document-close-form.component';

describe('DocumentCloseFormComponent', () => {
  let component: DocumentCloseFormComponent;
  let fixture: ComponentFixture<DocumentCloseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentCloseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCloseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
