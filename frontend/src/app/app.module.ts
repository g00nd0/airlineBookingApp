import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { BookingsComponent } from './bookings/bookings.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';

import { UserService } from './services/user.service';
import { LogoutComponent } from './logout/logout.component';
import { CreateBookingsComponent } from './create-bookings/create-bookings.component';
import { RegisterComponent } from './register/register.component';
import { BookingsService } from './services/bookings.service';
import { SessionService } from './services/session.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PwResetComponent } from './pw-reset/pw-reset.component';
import { EditBookingComponent } from './edit-booking/edit-booking.component';

const appRoutes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit', component: EditBookingComponent },
  { path: 'pw-reset', component: PwResetComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'create-bookings', component: CreateBookingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    BookingsComponent,
    HeaderComponent,
    NavbarComponent,
    ProfileComponent,
    LoginComponent,

    CreateBookingsComponent,
    RegisterComponent,
    PwResetComponent,
    EditBookingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [UserService, BookingsService, SessionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
