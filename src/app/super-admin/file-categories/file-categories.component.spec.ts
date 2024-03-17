import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileCategoriesComponent } from './file-categories.component';

describe('FileCategoriesComponent', () => {
  let component: FileCategoriesComponent;
  let fixture: ComponentFixture<FileCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileCategoriesComponent]
    });
    fixture = TestBed.createComponent(FileCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
