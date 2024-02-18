import { TestBed } from '@angular/core/testing';

import { AntecedantsService } from './antecedants.service';

describe('AntecedantsService', () => {
  let service: AntecedantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntecedantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
