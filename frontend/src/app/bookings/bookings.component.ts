import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Flights } from '../models/flights';
import { Bookings } from '../models/bookings';
import { User } from '../models/users';
import { BookingsService } from '../services/bookings.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  providers: [DecimalPipe],
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  bookings: Bookings[] = [];
  flights: Flights[] = [];
  agents: User[] = [];
  selectedAgent!: string;

  constructor(
    private bookingsService: BookingsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.bookingsService
      .getAllBookings()
      .subscribe((bookings) => (this.bookings = bookings));
    this.userService.getAgents().subscribe((agents) => (this.agents = agents));
  }

  onSearchSubmit(selectedAgent: string): void {
    if (selectedAgent == 'all') {
      this.bookingsService.getAllBookings().subscribe((bookings) => {
        this.bookings = bookings;
      });
    } else {
      this.bookingsService
        .getAllBookingsByAgent(selectedAgent)
        .subscribe((bookings) => {
          this.bookings = bookings;
        });
    }
  }
}
