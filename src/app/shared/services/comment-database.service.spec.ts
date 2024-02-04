import { TestBed } from '@angular/core/testing';

import { CommentDatabaseService } from './comment-database.service';

describe('CommentDatabaseService', () => {
  let service: CommentDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
