import { Component, OnInit } from '@angular/core';
import { User } from '../models/users';
import { UserService } from '../services/user.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  username: String = this.sessionService.sessionGet();
  currentUser!: User;
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getLoggedInUser(this.username).subscribe((user) => {
      this.currentUser = user[0];
      this.userService.logoutUser(this.currentUser).subscribe(() => {
        this.sessionService.sessionInit();
        this.userService.emitUserLogin('');
        console.log('logout success');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      });
    });
  }
}
