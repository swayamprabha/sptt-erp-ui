/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DriverFormService } from './driver-form.service';

describe('DriverFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriverFormService]
    });
  });

  it('should ...', inject([DriverFormService], (service: DriverFormService) => {
    expect(service).toBeTruthy();
  }));
});
