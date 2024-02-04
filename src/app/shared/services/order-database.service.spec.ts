import { TestBed } from '@angular/core/testing';

import { OrderDatabaseService } from './order-database.service';

describe('OrderDatabaseService', () => {
  let service: OrderDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
