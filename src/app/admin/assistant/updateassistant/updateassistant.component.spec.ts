import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateassistantComponent } from './updateassistant.component';

describe('UpdateassistantComponent', () => {
  let component: UpdateassistantComponent;
  let fixture: ComponentFixture<UpdateassistantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateassistantComponent]
    });
    fixture = TestBed.createComponent(UpdateassistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
