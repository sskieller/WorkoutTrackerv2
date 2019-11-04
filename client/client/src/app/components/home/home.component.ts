import { WorkoutProgramPublicService } from './../../_services/workout-program-public.service';
import { WorkoutProgramPublicInterface } from '@models/workoutProgramPublic';
import { UserInterface } from '@models/user';
import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import {  AuthenticationService } from '@services/authentication.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    programs: WorkoutProgramPublicInterface[];

    constructor(private WorkoutProgramPublicService: WorkoutProgramPublicService) { }

    ngOnInit() {
        this.loading = true;
        this.WorkoutProgramPublicService.getWorkoutProgramPublic().pipe(first()).subscribe(programs => {
            this.loading = false;
            this.programs = programs;
        });
    }
}
