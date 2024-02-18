import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabiesComponent } from './babies.component';

describe('BabiesComponent', () => {
  let component: BabiesComponent;
  let fixture: ComponentFixture<BabiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabiesComponent]
    });
    fixture = TestBed.createComponent(BabiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
