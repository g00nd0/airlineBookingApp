import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { USERS } from '../mock-users';
import { User } from '../models/users';
import { UserLoggedIn } from '../models/usersLoggedIn';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private apiLoggedIn = 'http://localhost:3000/usersLoggedIn';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getAgents(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/?userType=Agent`);
  }

  getOneUser(username: String): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/?username=${username}`);
  }

  getOneUserById(userId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/?id=${userId}`);
  }

  logoutUser(user: User): Observable<User> {
    const urlRequest = `${this.apiLoggedIn}/${user.id}`;
    return this.http.delete<User>(urlRequest);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, httpOptions);
  }

  getLoggedInUser(username: String) {
    return this.http.get<User[]>(`${this.apiLoggedIn}?username=${username}`);
  }

  loginUser(username: String): Observable<UserLoggedIn> {
    const loggedInUser = { username: username, status: true };
    return this.http.post<UserLoggedIn>(
      this.apiLoggedIn,
      loggedInUser,
      httpOptions
    );
  }

  // loginUser(user: any): Observable<Boolean> {
  //   const userLogin = user;

  //   const userExist = this.getOneUser(userLogin.username).subscribe(
  //     (users) => users.length > 0
  //   );
  //   console.log(userExist);
  //   if (userExist) {
  //     //user exists
  //     console.log('user exists');
  //     return true;
  //   } else {
  //     //user does not exist
  //     console.log('user not found');
  //     return false;
  //   }
  // }
}
