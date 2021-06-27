export class User {
  id?: number;
  username!: String;
  email!: String;
  password!: String;
  userType!: String;
  status!: Boolean;
  bookings?: Object[];
  listOfAirlines?: String[];
}
