import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexTableModalComponent } from './flex-table-modal.component';
import { ModalDirective } from './modal.directive';

describe('FlexTableModalComponent', () => {
  let component: FlexTableModalComponent;
  let fixture: ComponentFixture<FlexTableModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexTableModalComponent, ModalDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
