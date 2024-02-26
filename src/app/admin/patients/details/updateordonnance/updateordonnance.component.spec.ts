import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateordonnanceComponent } from './updateordonnance.component';

describe('UpdateordonnanceComponent', () => {
  let component: UpdateordonnanceComponent;
  let fixture: ComponentFixture<UpdateordonnanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateordonnanceComponent]
    });
    fixture = TestBed.createComponent(UpdateordonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
