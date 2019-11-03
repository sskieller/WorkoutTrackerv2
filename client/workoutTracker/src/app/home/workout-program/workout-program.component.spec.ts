import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutProgramComponent } from './workout-program.component';

describe('WorkoutProgramComponent', () => {
  let component: WorkoutProgramComponent;
  let fixture: ComponentFixture<WorkoutProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
