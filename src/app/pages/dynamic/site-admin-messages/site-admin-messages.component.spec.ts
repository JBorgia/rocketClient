import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAdminMessagesComponent } from './site-admin-messages.component';

describe('SiteAdminMessagesComponent', () => {
  let component: SiteAdminMessagesComponent;
  let fixture: ComponentFixture<SiteAdminMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteAdminMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAdminMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
