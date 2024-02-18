import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EttComponent } from './ett.component';

describe('EttComponent', () => {
  let component: EttComponent;
  let fixture: ComponentFixture<EttComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EttComponent]
    });
    fixture = TestBed.createComponent(EttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
