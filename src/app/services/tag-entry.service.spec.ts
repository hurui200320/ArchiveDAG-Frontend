import { TestBed } from '@angular/core/testing';

import { TagEntryService } from './tag-entry.service';

describe('TagEntryService', () => {
  let service: TagEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
