import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { User } from '../models/users';
import { debounceTime } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  formValid: boolean = false;

  title: String = 'Register';
  username!: String;
  email!: String;
  password!: String;
  passwordVer!: String;
  userType!: String;
  newUser: Observable<any> | undefined;
  user!: Observable<any>;

  private _failed = new Subject<string>();
  private _success = new Subject<string>();
  failMessage = '';
  successMessage = '';
  userFailMessage = '';
  emailFailMessage = '';
  passwordFailMessage = '';
  passwordVerFailMessage = '';
  typeFailMessage = '';

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this._failed.subscribe((message) => (this.failMessage = message));
    this._success.subscribe((message) => (this.successMessage = message));
    this._failed.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  createFailMessage(message: string) {
    this._failed.next(message);
  }

  createSuccessMessage(message: string) {
    this._success.next(message);
  }

  registerCheck(inputId: String, inputText: String) {
    let failMsg = '';

    if (inputId === 'username') {
      if (inputText.length < 8 || inputText.match(' ')) {
        failMsg =
          'Username must be at least 8 characters long and contain no spaces.';
      } else {
        this.selfClosingAlert.close();
        failMsg = '';
      }
    } else if (inputId === 'password') {
      if (
        inputText.length < 8 ||
        inputText.match(' ') ||
        !inputText.match(
          /^([0-9 A-Z]*[A-Z][0-9 A-Z]*[0-9][0-9 A-Z]*|[0-9 A-Z]*[0-9][0-9 A-Z]*[A-Z][0-9 A-Z]*)$/i
        )
      ) {
        failMsg =
          'Password must be alphanumeric, at least 8 characters long and contain no spaces.';
      } else {
        this.selfClosingAlert.close();
        failMsg = '';
      }
    } else if (inputId === 'passwordVer') {
      if (inputText !== this.password) {
        failMsg = 'Password does not match';
      } else {
        this.selfClosingAlert.close();
        failMsg = '';
      }
    } else if (inputId === 'email') {
      if (
        !inputText.match(
          /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
        )
      ) {
        failMsg = 'Not a valid email address';
      } else {
        this.selfClosingAlert.close();
        failMsg = '';
      }
    } else if (inputId === 'userType') {
      if (!(inputText === 'Individual' || inputText === 'Agent')) {
        failMsg = 'Invalid Option, please select from the dropdown list';
      } else if (inputText === 'Individual') {
        failMsg =
          'Account registration is available for Booking Agents only, please select "Booking Agent"';
      } else {
        this.selfClosingAlert.close();
        failMsg = '';
      }
    }

    if (
      failMsg.length > 0 ||
      this.username.length < 8 ||
      this.password.length < 8 ||
      this.passwordVer !== this.password ||
      !this.email ||
      !this.userType
    ) {
      this.createFailMessage(failMsg);
      this.formValid = false;
    } else {
      this.formValid = true;
    }

    //   if (
    //     failMsg.length === 0 &&
    //     this.username.length > 7 &&
    //     this.password.length > 7 &&
    //     this.passwordVer === this.password &&
    //     this.email &&
    //     this.userType
    //   ) {
    //     this.formValid = true;
    //   } else {
    //     this.createFailMessage(failMsg);
    //     this.formValid = false;
    //   }
  }

  onRegisterSubmit() {
    const newUserDetails: User = {
      username: this.username,
      email: this.email,
      password: this.password,
      userType: this.userType,
      status: true,
    };

    this.userService.registerUser(newUserDetails).subscribe(() => {
      this.createSuccessMessage(
        'Account Created, redirecting to login page...'
      );
      console.log('create success');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    });
  }
}
