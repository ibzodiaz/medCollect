import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutassistantComponent } from './ajoutassistant.component';

describe('AjoutassistantComponent', () => {
  let component: AjoutassistantComponent;
  let fixture: ComponentFixture<AjoutassistantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutassistantComponent]
    });
    fixture = TestBed.createComponent(AjoutassistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
