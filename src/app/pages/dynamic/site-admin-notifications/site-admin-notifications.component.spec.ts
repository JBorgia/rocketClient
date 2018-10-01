import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAdminNotificationsComponent } from './site-admin-notifications.component';

describe('SiteAdminNotificationsComponent', () => {
  let component: SiteAdminNotificationsComponent;
  let fixture: ComponentFixture<SiteAdminNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteAdminNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAdminNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
