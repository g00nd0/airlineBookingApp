import { Component, OnInit } from '@angular/core';
import { Flights } from '../models/flights';
import { BookingsService } from '../services/bookings.service';
@Component({
  selector: 'app-create-bookings',
  templateUrl: './create-bookings.component.html',
  styleUrls: ['./create-bookings.component.css'],
})
export class CreateBookingsComponent implements OnInit {
  flights!: Flights;
  allFlights!: Flights[];
  airline!: string;
  callsign!: string;
  dateOfFlight!: string;
  seatsToReserve!: number;

  constructor(private bookingsService: BookingsService) {}

  ngOnInit(): void {}

  onSubmitBooking() {
    this.bookingsService.getOneFlight(this.callsign).subscribe((flights) => {
      this.flights = flights[0];
      this.flights.seatsAvailable -= this.seatsToReserve;
      this.bookingsService.addBookingsToFlight(this.flights).subscribe(() => {
        console.log('booking success');
      });
    });
  }
}
