import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: String = 'frontend';
  toggleAddUser() {
    console.log('toggle');
  }

  ngOnInit(): void {
    sessionStorage.setItem('currentUser', '');
  }
}
