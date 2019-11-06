import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('ERROR: ', error.error.message);
    } else {
      console.error(
        `ERROR: Backend returned code: ${error.status}, ` +
        `body was: ${error.error}`
      );
    }

    return throwError(
      `ERROR: Something bad happened; Please try again later.`
    );
  }
}
