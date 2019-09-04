import { Component, OnInit, Input } from '@angular/core';
import { BookingService } from '../../../../../services/booking-rev3/booking.service';

@Component({
  selector: 'ngx-extra-charge',
  templateUrl: './extra-charge.component.html',
  styleUrls: ['./extra-charge.component.scss']
})
export class ExtraChargeComponent implements OnInit {
  @Input() value: any;
  constructor(
    public bookingServ: BookingService,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.bookingServ.refresh.subscribe(() => {

    });
  }

}
