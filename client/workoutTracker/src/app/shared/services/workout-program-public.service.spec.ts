import { TestBed } from '@angular/core/testing';

import { WorkoutProgramPublicService } from './workout-program-public.service';

describe('WorkoutProgramPublicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkoutProgramPublicService = TestBed.get(WorkoutProgramPublicService);
    expect(service).toBeTruthy();
  });
});
