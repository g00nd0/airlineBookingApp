import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bookings } from '../models/bookings';
import { Flights } from '../models/flights';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<Bookings[]> {
    return this.http.get<Bookings[]>(`${this.apiUrl}/bookings`);
  }

  getAllBookingsByAgent(bookingAgent: string): Observable<Bookings[]> {
    return this.http.get<Bookings[]>(
      `${this.apiUrl}/bookings?bookingAgent=${bookingAgent}`
    );
  }

  getOneBooking(flightId: String): Observable<Bookings[]> {
    return this.http.get<Bookings[]>(
      `${this.apiUrl}/bookings?flightId=${flightId}`
    );
  }

  getAllFlights(): Observable<Flights[]> {
    return this.http.get<Flights[]>(`${this.apiUrl}/flights`);
  }

  getOneFlight(id: number): Observable<Flights[]> {
    return this.http.get<Flights[]>(`${this.apiUrl}/flights?id=${id}`);
  }

  getAllFLightsByAirline(
    agent: String,
    airline?: String,
    date?: String
  ): Observable<Bookings[]> {
    if (date && airline) {
      return this.http.get<Bookings[]>(
        `${this.apiUrl}/bookings?airline=${airline}&bookingAgent=${agent}&dateOfFlight=${date}`
      );
    } else if (!airline) {
      return this.http.get<Bookings[]>(
        `${this.apiUrl}/bookings?bookingAgent=${agent}&dateOfFlight=${date}`
      );
    } else {
      return this.http.get<Bookings[]>(
        `${this.apiUrl}/bookings?airline=${airline}&bookingAgent=${agent}`
      );
    }
  }

  getAllFLightsByDate(
    agent: String,
    airline?: String,
    date?: String
  ): Observable<Bookings[]> {
    if (date && airline) {
      return this.http.get<Bookings[]>(
        `${this.apiUrl}/bookings?airline=${airline}&bookingAgent=${agent}&dateOfFlight=${date}`
      );
    } else {
      return this.http.get<Bookings[]>(
        `${this.apiUrl}/bookings?airline=${airline}&bookingAgent=${agent}`
      );
    }
  }

  addBookingsToFlight(flights: Flights): Observable<Flights> {
    return this.http.put<Flights>(
      `${this.apiUrl}/flights/${flights.id}`,
      flights,
      httpOptions
    );
  }

  addBookingEntry(bookings: Bookings): Observable<Bookings> {
    return this.http.post<Bookings>(
      `${this.apiUrl}/bookings`,
      bookings,
      httpOptions
    );
  }

  // addSeats(id: number) {
  //   let currentSeats = 0;
  //   this.http.get<any>(`${this.apiUrl}/flights/${id}`).subscribe((flight) => {
  //     currentSeats = flight;
  //   });
  //   const updateSeats = { seatsAvailable: currentSeats + 1 };
  //   this.http.patch(`${this.apiUrl}/flights/${id}`, updateSeats, httpOptions);
  // }

  // deleteBookingEntry(id: number): Observable<any> {
  //   let currentSeats = 0;
  //   this.http.get<any>(`${this.apiUrl}/flights/${id}`).subscribe((flight) => {
  //     currentSeats = flight.seatsAvailable;
  //   });
  //   console.log(currentSeats);
  //   const updateSeats = { seatsAvailable: currentSeats + 1 };
  //   this.http.patch(`${this.apiUrl}/flights/${id}`, updateSeats, httpOptions);
  //   return this.http.delete<any>(`${this.apiUrl}/bookings/${id}`);
  // }

  deleteBookingEntry(id: number): Observable<any> {
    this.http.patch(`${this.apiUrl}/flights/${id}`, 1, httpOptions);
    return this.http.delete<any>(`${this.apiUrl}/bookings/${id}`);
  }
}
