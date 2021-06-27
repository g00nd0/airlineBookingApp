import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title: String = 'Login';
  username!: string;
  password!: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onLoginSubmit() {
    const userLogin = {
      username: this.username,
      password: this.password, // will need bcrypt for this before submitting
    };

    this.userService.getOneUser(userLogin.username).subscribe((users) => {
      if (users.length == 0) {
        //if observable returns empty array, means no users found, therefore user does not exist
        console.log('no user exists');
        //redirect to error page?
      } else {
        if (
          users[0].username == userLogin.username &&
          users[0].password == userLogin.password
        ) {
          //check if user already logged in
          this.userService
            .getLoggedInUser(userLogin.username)
            .subscribe((loggedInUser) => {
              if (loggedInUser.length == 0) {
                // not logged in yet
                // set user as logged in
                this.userService.loginUser(userLogin.username).subscribe(() => {
                  console.log('login success');
                  //redirect to bookings page
                });
              } else {
                //redirect to bookings page
                console.log('already logged in');
              }
              sessionStorage.setItem('currentUser', userLogin.username);
            });
        } else {
          console.log('Login error, check credentials');
        }
      }
    });
  }
}
