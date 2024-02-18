import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliniquesComponent } from './cliniques.component';

describe('CliniquesComponent', () => {
  let component: CliniquesComponent;
  let fixture: ComponentFixture<CliniquesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliniquesComponent]
    });
    fixture = TestBed.createComponent(CliniquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
