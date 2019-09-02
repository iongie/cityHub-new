import { Component, OnInit, Input, TemplateRef, OnDestroy } from '@angular/core';
import { BookingService } from '../../../../../../services/booking-rev3/booking.service';
import { AddPayment } from '../../../booking';
import { Subject } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { NotificationService } from '../../../../../../services/notification/notification.service';
import { DatePipe } from '@angular/common';
import { UserRoleService } from '../../../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentTypeService } from '../../../../../../services/payment-type/payment-type.service';
import { RoomOperationService } from '../../../../../../services/room-operation/room-operation.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-room-not-found',
  templateUrl: './room-not-found.component.html',
  styleUrls: ['./room-not-found.component.scss'],
})
export class RoomNotFoundComponent implements OnInit, OnDestroy {
  dataAddPaymentCharge = new AddPayment;
  public subs= new Subject();
  userCityHub: any;
  show: any;
  forRole: any;
  paymentType: any;
  constructor(
    private dialogService: NbDialogService,
    public bookingServ: BookingService,
    public notifServ: NotificationService,
    public datepipe: DatePipe,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public router: Router,
    private activeRoute: ActivatedRoute,
    public paymentTypeServ: PaymentTypeService,
    public roomOperationServ: RoomOperationService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

}
