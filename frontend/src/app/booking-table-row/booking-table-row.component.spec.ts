import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTableRowComponent } from './booking-table-row.component';

describe('BookingTableRowComponent', () => {
  let component: BookingTableRowComponent;
  let fixture: ComponentFixture<BookingTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingTableRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
