import { TestBed } from '@angular/core/testing';

import { FileCategoriesService } from './file-categories.service';

describe('FileCategoriesService', () => {
  let service: FileCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
