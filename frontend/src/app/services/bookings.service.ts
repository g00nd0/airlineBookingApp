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

  getAllFLightsByAirline(airline: String): Observable<Flights[]> {
    return this.http.get<Flights[]>(
      `${this.apiUrl}/flights?airline=${airline}`
    );
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
}
