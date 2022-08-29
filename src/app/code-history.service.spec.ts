import { TestBed } from '@angular/core/testing';

import { CodeHistoryService } from './code-history.service';

describe('CodeHistoryService', () => {
  let service: CodeHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
