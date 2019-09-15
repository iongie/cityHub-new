import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusinessSourceService } from '../../../services/business-source/business-source.service';
import { GuestService } from '../../../services/guest/guest.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';
import { RoomTypeService } from '../../../services/room-type/room-type.service';
import { RoomOperationService } from '../../../services/room-operation/room-operation.service';
import { CountryService } from '../../../services/country/country.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ExtraChargeService } from '../../../services/extra-charge/extra-charge.service';
import { ExtraChargeCategoryService } from '../../../services/extra-charge-category/extra-charge-category.service';
import { PaymentTypeService } from '../../../services/payment-type/payment-type.service';
import { NbDialogService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { MiscellaneousSalesService } from '../../../services/miscellaneous-sales/miscellaneous-sales.service';

@Component({
  selector: 'ngx-miscellaneous-sales',
  templateUrl: './miscellaneous-sales.component.html',
  styleUrls: ['./miscellaneous-sales.component.scss'],
})
export class MiscellaneousSalesComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  sortDateMisc = {
    fromDate: new Date(),
    toDate: new Date(),
  };
  constructor(
    public miscellaneousSalesServ: MiscellaneousSalesService,
    public businessSourceServ: BusinessSourceService,
    public guestServ: GuestService,
    public notificationServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public roomTypeServ: RoomTypeService,
    public roomOperationServ: RoomOperationService,
    public countryServ: CountryService,
    public datepipe: DatePipe,
    public router: Router,
    private activeRoute: ActivatedRoute,
    public extraChargeServ: ExtraChargeService,
    public extraChargeCategoryServ: ExtraChargeCategoryService,
    public paymentTypeServ: PaymentTypeService,
    private dialogService: NbDialogService,
    public notifServ: NotificationService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  goToAddMiscSales() {
    this.router.navigate(['pages/add-miscellaneous-sales']);
  }

}
