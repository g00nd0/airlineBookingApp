import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Flights } from '../models/flights';
import { Bookings } from '../models/bookings';
import { UserService } from '../services/user.service';
import { BookingsService } from '../services/bookings.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// function search(text: string, pipe: PipeTransform): Flights[] {
//   return COUNTRIES.filter(country => {
//     const term = text.toLowerCase();
//     return country.name.toLowerCase().includes(term)
//         || pipe.transform(country.area).includes(term)
//         || pipe.transform(country.population).includes(term);
//   });
// }

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  bookings: Bookings[] = [];
  flights: Flights[] = [];

  // countries$: Observable<Country[]>;
  // filter = new FormControl('');

  // constructor(pipe: DecimalPipe) {
  //   this.countries$ = this.filter.valueChanges.pipe(
  //     startWith(''),
  //     map(text => search(text, pipe))
  //   );
  // }

  constructor(
    private bookingsService: BookingsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.bookingsService.getAllBookings().subscribe((bookings) => {
      this.bookings = bookings;
      console;
    });
  }
}
