import { Component, OnInit, ViewChild } from '@angular/core';
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

  private _success = new Subject<string>();
  failMessage = '';

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  constructor(private bookingsService: BookingsService) {}

  ngOnInit(): void {
    this.bookingsService.getAllFlights().subscribe((allFlights) => {
      this.allFlights = allFlights;
    });
    this._success.subscribe((message) => (this.failMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  createFailMessage(message: string) {
    this._success.next(message);
  }

  onSubmitBooking() {
    this.bookingsService.getOneFlight(this.selected).subscribe((flights) => {
      this.flights = flights[0];

      console.log(this.flights);

      if (this.flights) {
        if (this.seatsToReserve <= this.flights.seatsAvailable) {
          this.flights.seatsAvailable -= this.seatsToReserve;
          this.bookingsService
            .addBookingsToFlight(this.flights)
            .subscribe((flights) => {
              const { id, seatsAvailable, seatsTotal, ...rest } = this.flights;

              const oneBookingEntry: Bookings = {
                ...rest,
                bookingAgent:
                  sessionStorage.getItem('currentUser') || 'unknown',
                status: 'Reserved',
              };

              for (let i = 0; i < this.seatsToReserve; i++) {
                this.bookingsService
                  .addBookingEntry(oneBookingEntry)
                  .subscribe(() => {
                    console.log('booking success for ' + i);
                  });
              }
            });
        } else if (this.seatsToReserve > this.flights.seatsAvailable) {
          console.log(this.seatsToReserve);
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
