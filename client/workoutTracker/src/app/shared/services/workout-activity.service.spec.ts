import { TestBed } from '@angular/core/testing';

import { WorkoutActivityService } from './workout-activity.service';

describe('WorkoutActivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkoutActivityService = TestBed.get(WorkoutActivityService);
    expect(service).toBeTruthy();
  });
});
