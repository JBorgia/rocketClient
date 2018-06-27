import { ViewContainerRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDirective } from './modal.directive';

describe('ModalDirectiveDirective', () => {
  let directive: ModalDirective;
  let fixture: ComponentFixture<ModalDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDirective],
      providers: [
        { provide: ViewContainerRef, useClass: ViewContainerRef },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDirective);
    directive = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
