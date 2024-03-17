import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordassistantComponent } from './passwordassistant.component';

describe('PasswordassistantComponent', () => {
  let component: PasswordassistantComponent;
  let fixture: ComponentFixture<PasswordassistantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordassistantComponent]
    });
    fixture = TestBed.createComponent(PasswordassistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
