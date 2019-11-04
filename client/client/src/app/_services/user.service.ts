import { UserInterface } from '@models/user';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface UpdateUserInterface {
  name: {
    firstName: string,
    lastName: string
  };
  username: string;
  password: string;
}

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(
    private httpClient: HttpClient) {
  }

  getUserById(userId: number) {
    return this.httpClient.get<UserInterface>(`${environment.API_BASE_URL}/user/${userId}`);
  }

  updateUserById(userId: number, params: UpdateUserInterface) {
    return this.httpClient.put<UserInterface>(`${environment.API_BASE_URL}/user/${userId}`, {params})
    .pipe(map(user => {
      // Updates user details
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }));
  }

  deleteUserById(userId: number) {
    localStorage.removeItem('currentUser');
    return this.httpClient.delete<UserInterface>(`${environment.API_BASE_URL}/user/${userId}`);
  }
}
