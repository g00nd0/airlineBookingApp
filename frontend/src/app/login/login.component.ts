import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/users';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title: String = 'Login';
  username!: string;
  password!: string;

  private _success = new Subject<string>();
  failMessage = '';

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._success.subscribe((message) => (this.failMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  loginFailMessage(message: string) {
    this._success.next(message);
  }

  onLoginSubmit() {
    const userLogin = {
      username: this.username,
      password: this.password, // will need bcrypt for this before submitting
    };

    this.userService.getOneUser(userLogin.username).subscribe((users) => {
      console.log(sessionStorage.getItem('currentUser'));
      if (users.length == 0) {
        //if observable returns empty array, means no users found, therefore user does not exist
        this.loginFailMessage(
          'Login Error, user does not exist, please register for a new account.'
        );
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
                this.userService.emitUserLogin(userLogin.username); //emit logged in user for navbar
                console.log('already logged in');
              }
              this.sessionService.sessionSet(userLogin.username);
              console.log(sessionStorage.getItem('currentUser'));
            });
        } else {
          this.loginFailMessage('Login error, please check your credentials');
          console.log('Login error, check credentials');
        }
      }
    });
  }
}
