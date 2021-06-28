import { Component, Input, OnInit } from '@angular/core';
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
      this.bookingsService.addBookingsToFlight(this.flights).subscribe(() => {
        console.log('booking success');
      });
    });
  }
}
