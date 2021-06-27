import { Component, OnInit } from '@angular/core';
import { User } from '../models/users';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  username: String = JSON.stringify(sessionStorage.getItem('currentUser'));
  currentUser!: User;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getLoggedInUser(this.username).subscribe((user) => {
      this.currentUser = user[0];
      this.userService.logoutUser(this.currentUser).subscribe(() => {
        sessionStorage.setItem('currentUser', '');
        console.log('logout success');
      });
    });
  }
}
