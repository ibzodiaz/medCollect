import { TestBed } from '@angular/core/testing';

import { ParacliniquesService } from './paracliniques.service';

describe('ParacliniquesService', () => {
  let service: ParacliniquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParacliniquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
