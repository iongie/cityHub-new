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
import { CountryService } from '../../../services/country/country.service';

@Component({
  selector: 'ngx-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  businessSource: any;
  guest: any;
  country: any;
  userCityHub: any;
  bookingStepOne = {
    arrivalDate: '',
    duration: '',
    guestId: '',
    guestName: '',
    address: '',
    city: '',
    countryId: '',
    guestFileScan: '',
    phoneNumber: '',
    sourceId: '',
    sourceName: '',
    sourceDesc: '',
    createdBy: '',
  }

  modelGuest: any;
  modelBusinessSource: any;

  constructor(
    public businessSourceServ: BusinessSourceService,
    public guestServ: GuestService,
    public notificationServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public roomTypeServ: RoomTypeService,
    public roomOperationServ: RoomOperationService,
    public countryServ: CountryService,
  ) { }

  ngOnInit() {
    this.getGuest();
    this.getBusinessSource();
    this.getCountry();
    this.detailAccount();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  detailAccount() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data).pipe(takeUntil(this.subs)).subscribe(res => {
      this.userCityHub = {
        name : res[0].full_name,
      };
      console.log(res);
    });
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

  getCountry() {
    this.countryServ.get().pipe(takeUntil(this.subs)).subscribe(resCountry => {
      this.country = resCountry.map((y) => {
        const xyz = {
          countryId: y.country_id,
          countryName: y.country_name,
        };
        return xyz;
      })
    })
  }

  searchGuest = (textGuest: Observable<string>) =>
  textGuest.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.guest.filter(v => v.guestName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatterGuest = (x: {guestName: string}) => x.guestName;

  searchBusinessSource = (textBusinessSource: Observable<string>) =>
  textBusinessSource.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.businessSource.filter(v => v.businnessSourceName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatterBusinessSource =(x: {businnessSourceName: string}) => x.businnessSourceName;

  onChangeGuest(event) {
    if(event === '') {
      this.bookingStepOne = {
        arrivalDate: '',
        duration: '',
        guestId: '',
        guestName: '',
        address: '',
        city: '',
        countryId: '',
        guestFileScan: '',
        phoneNumber: '',
        sourceId: '',
        sourceName: '',
        sourceDesc: '',
        createdBy: '',
      }
    } else {
      this.bookingStepOne = {
        arrivalDate: '',
        duration: '',
        guestId: event.guestId,
        guestName: event.guestName,
        address: event.address,
        city: event.city,
        countryId: event.countryId,
        guestFileScan: event.guestFileScan,
        phoneNumber: event.phoneNumber,
        sourceId: '',
        sourceName: '',
        sourceDesc: '',
        createdBy: '',
      }
    }
    
    console.log(event);
  }

  onChangeBusinessSource(event) {
    if(event === '') {
      this.bookingStepOne = {
        arrivalDate: '',
        duration: '',
        guestId: '',
        guestName: '',
        address: '',
        city: '',
        countryId: '',
        guestFileScan: '',
        phoneNumber: '',
        sourceId: '',
        sourceName: '',
        sourceDesc: '',
        createdBy: '',
      }
    } else {
      this.bookingStepOne = {
        arrivalDate: '',
        duration: '',
        guestId: this.bookingStepOne.guestId,
        guestName: this.bookingStepOne.guestName,
        address: this.bookingStepOne.address,
        city: this.bookingStepOne.city,
        countryId: this.bookingStepOne.countryId,
        guestFileScan: this.bookingStepOne.guestFileScan,
        phoneNumber: this.bookingStepOne.phoneNumber,
        sourceId: event.businnessSourceId,
        sourceName: event.businnessSourceName,
        sourceDesc: event.businnessSourceDescription,
        createdBy: '',
      }
    }
    
    console.log(this.bookingStepOne);
  }

  saveStepOne() {
    const data = {
      arrivalDate: '',
      duration: '',
      guestId: this.bookingStepOne.guestId,
      sourceId: this.bookingStepOne.sourceId,
      createBy: this.userCityHub.username,
    };
  }

}
