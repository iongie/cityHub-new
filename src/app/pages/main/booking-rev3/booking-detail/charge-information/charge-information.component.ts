import { Component, OnInit, Input } from '@angular/core';
import { DetailBookingByBookingId } from '../../booking';

@Component({
  selector: 'ngx-charge-information',
  templateUrl: './charge-information.component.html',
  styleUrls: ['./charge-information.component.scss'],
})
export class ChargeInformationComponent implements OnInit {
  detailBookingByBookingId = new DetailBookingByBookingId;
  @Input() value: any;
  constructor() { }

  ngOnInit() {
    this.detailBookingByBookingId = this.value;
  }

}
