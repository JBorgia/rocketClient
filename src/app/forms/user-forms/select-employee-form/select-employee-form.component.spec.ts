import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEmployeeFormComponent } from './select-employee-form.component';

describe('FormComponent', () => {
  let component: SelectEmployeeFormComponent;
  let fixture: ComponentFixture<SelectEmployeeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectEmployeeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
