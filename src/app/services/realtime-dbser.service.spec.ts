import { TestBed } from '@angular/core/testing';

import { RealtimeDBSerService } from './realtime-dbser.service';

describe('RealtimeDBSerService', () => {
  let service: RealtimeDBSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeDBSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
