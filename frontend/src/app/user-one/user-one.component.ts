import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/users';

@Component({
  selector: 'app-user-one',
  templateUrl: './user-one.component.html',
  styleUrls: ['./user-one.component.css'],
})
export class UserOneComponent implements OnInit {
  @Input() user!: User;
  @Output() onDeleteUser: EventEmitter<User> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDelete(user: User) {
    this.onDeleteUser.emit(user);
  }
}
