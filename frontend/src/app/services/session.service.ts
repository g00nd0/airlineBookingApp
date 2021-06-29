import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  sessionInit() {
    sessionStorage.setItem('currentUser', '');
  }

  sessionSet(username: string) {
    sessionStorage.setItem('currentUser', `${username}`);
  }

  sessionGet(): string {
    return sessionStorage.getItem('currentUser') || '';
  }
}
