import { TestBed } from '@angular/core/testing';

import { StudyFieldsService } from './study-fields.service';

describe('StudyFieldsService', () => {
  let service: StudyFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
