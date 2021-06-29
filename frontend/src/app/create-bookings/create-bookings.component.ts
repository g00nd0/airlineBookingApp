import { Component, Input, OnInit } from '@angular/core';
import { Bookings } from '../models/bookings';
import { Flights } from '../models/flights';
import { BookingsService } from '../services/bookings.service';
@Component({
  selector: 'app-create-bookings',
  templateUrl: './create-bookings.component.html',
  styleUrls: ['./create-bookings.component.css'],
})
export class CreateBookingsComponent implements OnInit {
  // @Input() user!: User;
  flights!: Flights;
  bookings!: Bookings;
  allFlights!: Flights[];
  seatsToReserve!: number;
  selected!: number;

  constructor(private bookingsService: BookingsService) {}

  ngOnInit(): void {
    this.bookingsService.getAllFlights().subscribe((allFlights) => {
      this.allFlights = allFlights;
    });
  }

  onSubmitBooking() {
    this.bookingsService.getOneFlight(this.selected).subscribe((flights) => {
      this.flights = flights[0];
      this.flights.seatsAvailable -= this.seatsToReserve;
      this.bookingsService
        .addBookingsToFlight(this.flights)
        .subscribe((flights) => {
          const { id, seatsAvailable, seatsTotal, ...rest } = this.flights;

          const oneBookingEntry: Bookings = {
            ...rest,
            bookingAgent: sessionStorage.getItem('currentUser') || 'unknown',
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
    });
  }
}
