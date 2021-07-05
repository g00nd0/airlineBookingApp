import { Component, OnInit, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Flights } from '../models/flights';
import { Bookings } from '../models/bookings';
import { User } from '../models/users';
import { BookingsService } from '../services/bookings.service';
import { UserService } from '../services/user.service';
import { SessionService } from '../services/session.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css'],
})
export class EditBookingComponent implements OnInit {
  bookingId!: number;
  customerName!: String;
  bookingInfo!: Bookings;
  formValid: boolean = true;

  private _failed = new Subject<string>();
  failMessage = '';
  private _edited = new Subject<string>();
  editedMessage = '';

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  constructor(
    private bookingsService: BookingsService,
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // call specific booking and then populate vars above
    this.bookingId = parseInt(
      sessionStorage.getItem('selectedBookingId') || '0'
    );

    this.bookingsService.getOneBooking(this.bookingId).subscribe((bookings) => {
      this.bookingInfo = bookings[0];
      this.customerName = bookings[0].customerName;
    });
    this._failed.subscribe((message) => (this.failMessage = message));
    this._edited.subscribe((message) => (this.editedMessage = message));
    this._failed.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    this._edited.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  customerNameCheck(nameInput: String) {
    // validation check for name/username, cannot be blank
    if (nameInput.length < 2) {
      this.editFailMessage('Customer name cannot be blank.');
      this.formValid = false;
    } else {
      this.selfClosingAlert.close();
      this.formValid = true;
    }
  }

  editFailMessage(message: string) {
    this._failed.next(message);
  }

  editSuccessMessage(message: string) {
    this._edited.next(message);
  }

  onEditSubmit(id: number, customerName: String): any {
    this.bookingsService.editBooking(id, customerName).subscribe(() => {
      this.editSuccessMessage('Booking Edited');
      this.router.navigate([`/bookings`]);
    });
    console.log(`edited ID ${id}, ${customerName}`);
  }
}
