import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pw-reset',
  templateUrl: './pw-reset.component.html',
  styleUrls: ['./pw-reset.component.css'],
})
export class PwResetComponent implements OnInit {
  username!: string;
  password!: string;
  passwordConfirm!: string;

  private _failed = new Subject<string>();
  private _success = new Subject<string>();
  failMessage = '';
  successMessage = '';

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

  resetFailMessage(message: string) {
    this._failed.next(message);
  }

  resetSuccessMessage(message: string) {
    this._success.next(message);
  }

  onResetSubmit() {
    if (
      this.password.length < 8 ||
      this.password.match(' ') ||
      !this.password.match(
        /^([0-9 A-Z]*[A-Z][0-9 A-Z]*[0-9][0-9 A-Z]*|[0-9 A-Z]*[0-9][0-9 A-Z]*[A-Z][0-9 A-Z]*)$/i
      )
    ) {
      this.resetFailMessage(
        'Password must be alphanumeric, at least 8 characters long and contain no spaces.'
      );
    } else {
      if (this.password === this.passwordConfirm) {
        this.userService.getOneUser(this.username).subscribe((user) => {
          if (user[0]) {
            this.userService
              .resetPw(user[0] || 0, this.password)
              .subscribe(() => {
                console.log('reset success');
                this.resetSuccessMessage(
                  'Password reset successful, redirecting to Login page...'
                );
                setTimeout(() => {
                  this.router.navigate(['/login']);
                }, 2000);
              });
          } else {
            this.resetFailMessage(
              'User does not exist, please register for a new account.'
            );
          }
        });
      } else {
        this.resetFailMessage('Your passwords do not match.');
      }
    }
  }
}
