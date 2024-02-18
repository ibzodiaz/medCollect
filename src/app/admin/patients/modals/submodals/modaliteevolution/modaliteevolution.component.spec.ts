import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaliteevolutionComponent } from './modaliteevolution.component';

describe('ModaliteevolutionComponent', () => {
  let component: ModaliteevolutionComponent;
  let fixture: ComponentFixture<ModaliteevolutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModaliteevolutionComponent]
    });
    fixture = TestBed.createComponent(ModaliteevolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
