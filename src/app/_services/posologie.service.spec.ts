import { TestBed } from '@angular/core/testing';

import { PosologieService } from './posologie.service';

describe('PosologieService', () => {
  let service: PosologieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosologieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
