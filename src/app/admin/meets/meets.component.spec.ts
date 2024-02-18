import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetsComponent } from './meets.component';

describe('MeetsComponent', () => {
  let component: MeetsComponent;
  let fixture: ComponentFixture<MeetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetsComponent]
    });
    fixture = TestBed.createComponent(MeetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
