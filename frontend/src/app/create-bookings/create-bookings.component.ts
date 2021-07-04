import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Bookings } from '../models/bookings';
import { Flights } from '../models/flights';
import { BookingsService } from '../services/bookings.service';
@Component({
  selector: 'app-create-bookings',
  templateUrl: './create-bookings.component.html',
  styleUrls: ['./create-bookings.component.css'],
})
export class CreateBookingsComponent implements OnInit {
  flights!: Flights;
  bookings!: Bookings;
  allFlights!: Flights[];
  seatsToReserve!: number;
  selected!: number;
  currentDate: Date = new Date();
  customerName: string = '';

  private _failed = new Subject<string>();
  private _success = new Subject<string>();
  failMessage = '';
  successMessage = '';

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  constructor(
    private bookingsService: BookingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLatestFlights();
    this._failed.subscribe((message) => (this.failMessage = message));
    this._success.subscribe((message) => (this.successMessage = message));
    this._failed.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  getLatestFlights(): void {
    this.bookingsService.getAllFlights().subscribe((allFlights) => {
      const validFlightsList: Flights[] = [];

      allFlights.forEach((flight) => {
        const selectedDateParts = flight.dateOfFlight.split('/');
        const selectedDate = new Date(
          +selectedDateParts[2],
          +selectedDateParts[1] - 1,
          +selectedDateParts[0]
        ); //formatted date of flight
        if (selectedDate >= this.currentDate) {
          validFlightsList.push(flight);
        }
      });

      this.allFlights = validFlightsList;
    });
  }

  createFailMessage(message: string) {
    this._failed.next(message);
  }

  createSuccessMessage(message: string) {
    this._success.next(message);
  }

  onSubmitBooking() {
    this.bookingsService.getOneFlight(this.selected).subscribe((flights) => {
      this.flights = flights[0];

      if (this.flights && this.customerName) {
        if (
          this.seatsToReserve <= this.flights.seatsAvailable &&
          this.seatsToReserve > 0
        ) {
          this.flights.seatsAvailable -= this.seatsToReserve;
          this.bookingsService
            .addBookingsToFlight(this.flights)
            .subscribe((flights) => {
              const { id, seatsAvailable, seatsTotal, ...rest } = this.flights;

              const oneBookingEntry: Bookings = {
                ...rest,
                flightId: this.flights.id,
                bookingAgent:
                  sessionStorage.getItem('currentUser') || 'unknown',
                customerName: this.customerName,
                status: 'Reserved',
              };

              for (let i = 0; i < this.seatsToReserve; i++) {
                this.bookingsService
                  .addBookingEntry(oneBookingEntry)
                  .subscribe(() => {
                    console.log('booking success for ' + i);
                  });
              }
              this.createSuccessMessage(
                'Booking Created, redirecting to Bookings page...'
              );
              this.getLatestFlights();
              setTimeout(() => {
                this.router.navigate(['/bookings']);
              }, 3000);
            });
        } else if (this.seatsToReserve > this.flights.seatsAvailable) {
          this.createFailMessage(
            "You've selected too many seats, please enter a number less than the available seats."
          );
        } else {
          this.createFailMessage('Enter a valid number of seats.');
        }
      } else {
        this.createFailMessage('Error, please check your inputs.');
      }
    });
  }
}
