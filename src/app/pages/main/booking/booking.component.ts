import { RoomOperationService } from './../../../services/room-operation/room-operation.service';
import { RoomTypeService } from './../../../services/room-type/room-type.service';
import { AuthService } from './../../../services/auth/auth.service';
import { UserRoleService } from './../../../services/user-role/user-role.service';
import { NotificationService } from './../../../services/notification/notification.service';
import { GuestService } from './../../../services/guest/guest.service';
import { BusinessSourceService } from './../../../services/business-source/business-source.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ngx-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  businessSource: any;
  guest: any;
  bookingStepOne = {
    arrivalDate: '',
    duration: '',
    guestId: '',
    sourceId: '',
    createdBy: '',
  }

  public model: any;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.guest.filter(v => v.guestName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: {name: string}) => x.name;
  constructor(
    public businessSourceServ: BusinessSourceService,
    public guestServ: GuestService,
    public notificationServ: NotificationService,
    public userRoleServ: UserRoleService,
    public uthServ: AuthService,
    public roomTypeServ: RoomTypeService,
    public roomOperationServ: RoomOperationService,
  ) { }

  ngOnInit() {
    this.getGuest();
    this.getBusinessSource();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getBusinessSource() {
    this.businessSourceServ.get().pipe(takeUntil(this.subs)).subscribe(resBusinessSource => {
      this.businessSource = resBusinessSource.map((forResBusinessSource) => {
        const dataResBusinessSource = {
          businnessSourceId: forResBusinessSource.business_source_id,
          businnessSourceName: forResBusinessSource.business_source_name,
          businnessSourceDescription: forResBusinessSource.business_source_description,
        }
        return dataResBusinessSource;
      })
      console.log(this.businessSource);
    });
  }

  getGuest() {
    this.guestServ.get().pipe(takeUntil(this.subs)).subscribe(resGuest => {
      this.guest = resGuest.map((forResGuest) => {
        const dataResGuest = {
          guestId: forResGuest.guest_id,
          countryId: forResGuest.country_id,
          guestName: forResGuest.guest_name,
          address: forResGuest.address,
          city: forResGuest.city,
          phoneNumber: forResGuest.phone_number,
          guestFileScan: forResGuest.guest_file_scan,
        }
        return dataResGuest;
      })
      console.log(this.guest);
    });
  }

  doSomething(event) {
    console.log(event);
  }

}
