import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMessageFormComponent } from './create-message-form.component';

describe('FormComponent', () => {
  let component: CreateMessageFormComponent;
  let fixture: ComponentFixture<CreateMessageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMessageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
