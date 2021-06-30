import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/users';
import { first, catchError, retry, debounceTime } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;

  title: String = 'Register';
  username!: String;
  email!: String;
  password!: String;
  userType!: String;
  newUser: Observable<any> | undefined;
  user!: Observable<any>;

  private _failed = new Subject<string>();
  private _success = new Subject<string>();
  failMessage = '';
  successMessage = '';

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  // constructor(private http: HttpClient) {}
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    // getUser() {
    this.user = this.userService.getUsers(); //should return "pssst"
    console.log(this.user);
    this._failed.subscribe((message) => (this.failMessage = message));
    this._success.subscribe((message) => (this.successMessage = message));
    this._failed.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
    // }
  }

  createFailMessage(message: string) {
    this._failed.next(message);
  }

  createSuccessMessage(message: string) {
    this._success.next(message);
  }

  onRegisterSubmit() {
    const newUserDetails: User = {
      username: this.username,
      email: this.email,
      password: this.password,
      userType: this.userType,
      status: true,
    };
    console.log(newUserDetails);

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
