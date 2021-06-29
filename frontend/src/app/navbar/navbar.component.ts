import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUser!: string;
  loggedIn: boolean = false;

  constructor(
    private sessionService: SessionService,
    private userService: UserService
  ) {
    userService.getCurrentUser.subscribe((username) =>
      this.setCurrentUser(username)
    );
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.sessionGet();
  }

  setCurrentUser(username: string): void {
    this.currentUser = username;
    this.loggedIn = !(this.currentUser === '');
    console.log(this.loggedIn);
  }
}
