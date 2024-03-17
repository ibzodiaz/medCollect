import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordUserComponent } from './password-user.component';

describe('PasswordUserComponent', () => {
  let component: PasswordUserComponent;
  let fixture: ComponentFixture<PasswordUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordUserComponent]
    });
    fixture = TestBed.createComponent(PasswordUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
