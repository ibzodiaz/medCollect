import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParacliniquesComponent } from './paracliniques.component';

describe('ParacliniquesComponent', () => {
  let component: ParacliniquesComponent;
  let fixture: ComponentFixture<ParacliniquesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParacliniquesComponent]
    });
    fixture = TestBed.createComponent(ParacliniquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
