/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DayWiseFormService } from './day-wise-form.service';

describe('DayWiseFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DayWiseFormService]
    });
  });

  it('should ...', inject([DayWiseFormService], (service: DayWiseFormService) => {
    expect(service).toBeTruthy();
  }));
});
