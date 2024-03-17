import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalOperationsComponent } from './hospital-operations.component';

describe('HospitalOperationsComponent', () => {
  let component: HospitalOperationsComponent;
  let fixture: ComponentFixture<HospitalOperationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalOperationsComponent]
    });
    fixture = TestBed.createComponent(HospitalOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
