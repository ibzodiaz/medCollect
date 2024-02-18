import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyspneeComponent } from './dyspnee.component';

describe('DyspneeComponent', () => {
  let component: DyspneeComponent;
  let fixture: ComponentFixture<DyspneeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DyspneeComponent]
    });
    fixture = TestBed.createComponent(DyspneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
