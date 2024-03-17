import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlayoutComponent } from './slayout.component';

describe('SlayoutComponent', () => {
  let component: SlayoutComponent;
  let fixture: ComponentFixture<SlayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlayoutComponent]
    });
    fixture = TestBed.createComponent(SlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
