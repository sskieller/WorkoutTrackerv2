import { ChangeDetectionStrategy, Component, OnInit, Inject, Input } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';
import { WorkoutProgramPublicInterface } from '../../shared/services';

@Component({
  selector: 'wt-workout-program',
  templateUrl: './workout-program.component.html',
  styleUrls: ['./workout-program.component.scss']
})
export class WorkoutProgramComponent implements OnInit {
  @Input() workoutProgramsPublic: WorkoutProgramPublicInterface[] = [];
  readonly columns$: Observable<number>;
  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 1],
    ['sm', 1],
    ['md', 2],
    ['lg', 2],
    ['xl', 2],
  ]);

  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    private readonly media: MediaObserver
  ) {
    // tslint:disable-next-line: deprecation
    this.columns$ = this.media.media$
      .pipe(
        map(mc => this.breakpointsToColumnsNumber.get(mc.mqAlias) as number),
        startWith(3)
      );
  }

  ngOnInit() {
  }

}
