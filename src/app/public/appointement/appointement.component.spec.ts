import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointementComponent } from './appointement.component';

describe('AppointementComponent', () => {
  let component: AppointementComponent;
  let fixture: ComponentFixture<AppointementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointementComponent]
    });
    fixture = TestBed.createComponent(AppointementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
