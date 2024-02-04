import { TestBed } from '@angular/core/testing';

import { BookDatabaseService } from './book-database.service';

describe('BookDatabaseService', () => {
  let service: BookDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
