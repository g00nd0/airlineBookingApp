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

  getOneBooking(bookingId: number): Observable<Bookings[]> {
    return this.http.get<Bookings[]>(`${this.apiUrl}/bookings?id=${bookingId}`);
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

  addFlightSeat(flightId: number): any {
    this.http
      .get<any>(`${this.apiUrl}/flights/${flightId}`)
      .subscribe((flight) => {
        this.http
          .put<any>(
            `${this.apiUrl}/flights/${flightId}`,
            { ...flight, seatsAvailable: flight.seatsAvailable + 1 },
            httpOptions
          )
          .subscribe((flight) => {});
      });
  }

  deleteBookingEntry(id: number): Observable<any> {
    // this.http.patch(`${this.apiUrl}/flights/${id}`, 1, httpOptions);
    this.getOneBooking(id).subscribe((bookings) => {
      let flightId = bookings[0].flightId || 0;
      this.addFlightSeat(flightId).subscribe(() => {});
    });
    return this.http.delete<any>(`${this.apiUrl}/bookings/${id}`);
  }
}
