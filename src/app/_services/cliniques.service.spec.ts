import { TestBed } from '@angular/core/testing';

import { CliniquesService } from './cliniques.service';

describe('CliniquesService', () => {
  let service: CliniquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CliniquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
