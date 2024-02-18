import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentsComponent } from './antecedents.component';

describe('AntecedentsComponent', () => {
  let component: AntecedentsComponent;
  let fixture: ComponentFixture<AntecedentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AntecedentsComponent]
    });
    fixture = TestBed.createComponent(AntecedentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
