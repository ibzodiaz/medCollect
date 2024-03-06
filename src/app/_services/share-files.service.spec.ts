import { TestBed } from '@angular/core/testing';

import { ShareFilesService } from './share-files.service';

describe('ShareFilesService', () => {
  let service: ShareFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
