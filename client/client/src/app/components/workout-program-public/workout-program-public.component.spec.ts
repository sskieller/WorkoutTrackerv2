import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutProgramPublicComponent } from './workout-program-public.component';

describe('WorkoutProgramPublicComponent', () => {
  let component: WorkoutProgramPublicComponent;
  let fixture: ComponentFixture<WorkoutProgramPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutProgramPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutProgramPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
