import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtcdComponent } from './atcd.component';

describe('AtcdComponent', () => {
  let component: AtcdComponent;
  let fixture: ComponentFixture<AtcdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtcdComponent]
    });
    fixture = TestBed.createComponent(AtcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
