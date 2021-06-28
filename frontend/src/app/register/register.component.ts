import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/users';
import { first, catchError, retry } from 'rxjs/operators';
import { UserService } from '../services/user.service';

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

  // constructor(private http: HttpClient) {}
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    // getUser() {
    this.user = this.userService.getUsers(); //should return "pssst"
    console.log(this.user);
    // }
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
      console.log('create success');
    });
  }
}
