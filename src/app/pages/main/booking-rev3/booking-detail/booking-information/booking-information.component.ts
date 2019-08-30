import { Component, OnInit, Input } from '@angular/core';
import { DetailBookingByBookingId } from '../../booking';

@Component({
  selector: 'ngx-booking-information',
  templateUrl: './booking-information.component.html',
  styleUrls: ['./booking-information.component.scss'],
})
export class BookingInformationComponent implements OnInit {
  detailBookingByBookingId = new DetailBookingByBookingId;
  @Input() value: any;
  constructor() { }

  ngOnInit() {
    this.detailBookingByBookingId = this.value;
    console.log('boooking-information', this.detailBookingByBookingId.bookingInformation);
  }

}
