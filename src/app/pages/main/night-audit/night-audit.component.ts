import { Component, OnInit, OnDestroy } from '@angular/core';
import { NightAuditService } from '../../../services/night-audit/night-audit.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NotificationService } from '../../../services/notification/notification.service';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-night-audit',
  templateUrl: './night-audit.component.html',
  styleUrls: ['./night-audit.component.scss'],
})
export class NightAuditComponent implements OnInit, OnDestroy {
  forNightAudit = {
    date: new Date(),
  };
  nightAudit: LocalDataSource;
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  settings = {
    actions: false,
    columns: {
      bookingNumber: {
        title: 'Booking Number',
        type: 'string',
      },
      roomName: {
        title: 'Room Name',
        type: 'string',
      },
      roomTypeName: {
        title: 'Room Type Name',
        type: 'string',
      },
      guestName: {
        title: 'Guest Name',
        type: 'string',
      },
      departureDate: {
        title: 'Departure Date',
        type: 'string',
      },
      paymentDate: {
        title: 'Payment Date',
        type: 'string',
      },
      chargeType: {
        title: 'Charge Type',
        type: 'string',
      },
      chargeItem: {
        title: 'Charge Item',
        type: 'string',
      },
      subTotal: {
        title: 'Sub total',
        type: 'html',
        valuePrepareFunction: (value) => {
          return value = Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            currencyDisplay: 'code' }).format(value);
        },
        editable: false,
      },
    },
  };
  constructor(
    public nightAuditServ: NightAuditService,
    public notifServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public router: Router,
    public datepipe: DatePipe,
  ) { }

  ngOnInit() {
    this.getNightAUdit();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getNightAUdit() {
    const nightAUdit = {
      date: this.datepipe.transform( this.forNightAudit.date, 'yyyy-MM-dd'),
    };
    this.nightAuditServ.getNightAudit(nightAUdit)
    .pipe(takeUntil(this.subs))
    .subscribe(resNightAudit => {
      const data = resNightAudit.map(x => {
        const xkj = {
          bookingId: x.booking_id,
          bookingNumber: x.booking_number,
          bookingRoomId: x.booking_room_id,
          roomId: x.room_id,
          roomName: x.room_name,
          roomTypeId: x.room_type_id,
          roomTypeName: x.room_type_name,
          guestId: x.guest_id,
          guestName: x.guest_name,
          arrivalDate: x.arrival_date,
          departureDate: x.departure_date,
          duration: x.duration,
          paymentDate: x.payment_date,
          chargeType: x.charge_type,
          chargeItem: x.charge_item,
          subTotal: x.subtotal,
        };
        return xkj;
      });

      this.nightAudit = new LocalDataSource(data);
    });
  }

}
