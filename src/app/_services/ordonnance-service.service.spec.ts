import { TestBed } from '@angular/core/testing';

import { OrdonnanceServiceService } from './ordonnance-service.service';

describe('OrdonnanceServiceService', () => {
  let service: OrdonnanceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdonnanceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
