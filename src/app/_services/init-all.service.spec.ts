import { TestBed } from '@angular/core/testing';

import { InitAllService } from './init-all.service';

describe('InitAllService', () => {
  let service: InitAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
