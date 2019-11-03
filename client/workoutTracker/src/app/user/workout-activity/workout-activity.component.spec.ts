import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutActivityComponent } from './workout-activity.component';

describe('WorkoutActivityComponent', () => {
  let component: WorkoutActivityComponent;
  let fixture: ComponentFixture<WorkoutActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
