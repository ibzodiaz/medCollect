import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilecategoriesComponent } from './filecategories.component';

describe('FilecategoriesComponent', () => {
  let component: FilecategoriesComponent;
  let fixture: ComponentFixture<FilecategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilecategoriesComponent]
    });
    fixture = TestBed.createComponent(FilecategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
