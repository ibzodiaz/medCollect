import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutordonnanceComponent } from './ajoutordonnance.component';

describe('AjoutordonnanceComponent', () => {
  let component: AjoutordonnanceComponent;
  let fixture: ComponentFixture<AjoutordonnanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutordonnanceComponent]
    });
    fixture = TestBed.createComponent(AjoutordonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
