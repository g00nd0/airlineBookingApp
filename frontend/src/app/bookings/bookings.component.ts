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

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  providers: [DecimalPipe],
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  bookings: Bookings[] = [];
  airlines!: String[];
  agents: User[] = [];
  selectedAirline!: string;
  selectedDate!: string;

  private _failed = new Subject<string>();
  failMessage = '';
  private _deleted = new Subject<string>();
  deleteMessage = '';

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  constructor(
    private bookingsService: BookingsService,
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  formatDate(date: string): String {
    const d = new Date(date);
    const month =
      d.getMonth() > 9 ? d.getMonth().toString() + 1 : '0' + (d.getMonth() + 1);
    return (
      d.getDate().toString().padStart(2, '0') +
      '/' +
      month +
      '/' +
      d.getFullYear()
    );
  }

  ngOnInit(): void {
    this._failed.subscribe((message) => (this.failMessage = message));
    this._deleted.subscribe((message) => (this.deleteMessage = message));
    this._failed.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    this._deleted.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    this.bookingsService
      .getAllBookingsByAgent(this.sessionService.sessionGet())
      .subscribe((bookings) => (this.bookings = bookings));
    this.bookingsService.getAllFlights().subscribe((airlines) => {
      this.airlines = [...new Set(airlines.map((airline) => airline.airline))];
      console.log(this.airlines);

      return this.airlines;
    });
    // this.userService.getAgents().subscribe((agents) => (this.agents = agents));
  }

  searchFailMessage(message: string) {
    this._failed.next(message);
  }

  bookingDeleteMessage(message: string) {
    this._deleted.next(message);
  }
  resetFields(): void {
    this.selectedDate = '';
    this.selectedAirline = '';
  }

  deleteBooking(id: any): any {
    this.bookingsService.deleteBookingEntry(id).subscribe(() => {
      this.bookingDeleteMessage('Booking Deleted');
      this.onSearchSubmit('all');
    });
    console.log(id);
  }

  onSearchSubmit(selectedAirline: string): void {
    if (selectedAirline == 'all') {
      this.bookingsService
        .getAllBookingsByAgent(this.sessionService.sessionGet())
        .subscribe((bookings) => {
          this.bookings = bookings;
          this.resetFields();
        });
    } else {
      if (this.selectedDate && selectedAirline) {
        this.bookingsService
          .getAllFLightsByAirline(
            this.sessionService.sessionGet(),
            selectedAirline,
            this.formatDate(this.selectedDate)
          )
          .subscribe((bookings) => {
            this.bookings = bookings;
          });
      } else if (this.selectedDate) {
        this.bookingsService
          .getAllFLightsByAirline(
            this.sessionService.sessionGet(),
            '',
            this.formatDate(this.selectedDate)
          )
          .subscribe((bookings) => {
            this.bookings = bookings;
          });
      } else {
        this.searchFailMessage(
          'Invalid search, please input a valid airline and/or date'
        );
      }
    }
  }
}
