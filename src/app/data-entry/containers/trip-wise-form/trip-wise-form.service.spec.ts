/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TripWiseFormService } from './trip-wise-form.service';

describe('TripWiseFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripWiseFormService]
    });
  });

  it('should ...', inject([TripWiseFormService], (service: TripWiseFormService) => {
    expect(service).toBeTruthy();
  }));
});
