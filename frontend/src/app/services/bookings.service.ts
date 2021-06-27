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

  getAllBookingsByAgent(bookingAgentId: number): Observable<Bookings[]> {
    return this.http.get<Bookings[]>(
      `${this.apiUrl}/bookings?bookingAgentId=${bookingAgentId}`
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

  getOneFlight(callsign: String): Observable<Flights[]> {
    return this.http.get<Flights[]>(
      `${this.apiUrl}/flights?callsign=${callsign}`
    );
  }

  getAllFLightsByAirline(airline: String): Observable<Flights[]> {
    return this.http.get<Flights[]>(
      `${this.apiUrl}/flights?airline=${airline}`
    );
  }
}
