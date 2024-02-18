import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelecoeurComponent } from './telecoeur.component';

describe('TelecoeurComponent', () => {
  let component: TelecoeurComponent;
  let fixture: ComponentFixture<TelecoeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelecoeurComponent]
    });
    fixture = TestBed.createComponent(TelecoeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
