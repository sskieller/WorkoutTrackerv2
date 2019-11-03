import { TestBed } from '@angular/core/testing';

import { WorkoutProgramService } from './workout-program.service';

describe('WorkoutProgramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkoutProgramService = TestBed.get(WorkoutProgramService);
    expect(service).toBeTruthy();
  });
});
