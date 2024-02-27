import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintordonnanceComponent } from './printordonnance.component';

describe('PrintordonnanceComponent', () => {
  let component: PrintordonnanceComponent;
  let fixture: ComponentFixture<PrintordonnanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintordonnanceComponent]
    });
    fixture = TestBed.createComponent(PrintordonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
