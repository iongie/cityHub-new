import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddBooking, RoomInformation, Source, Guest } from '../booking';
import { Subject, Observable } from 'rxjs';
import { AuthService } from '../../../../services/auth/auth.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { BookingService } from '../../../../services/booking-rev3/booking.service';
import { BusinessSourceService } from '../../../../services/business-source/business-source.service';
import { GuestService } from '../../../../services/guest/guest.service';
import { UserRoleService } from '../../../../services/user-role/user-role.service';
import { RoomTypeService } from '../../../../services/room-type/room-type.service';
import { RoomOperationService } from '../../../../services/room-operation/room-operation.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntil, debounceTime, map } from 'rxjs/operators';
import { CountryService } from '../../../../services/country/country.service';
import { NbDateService } from '@nebular/theme/components/calendar-kit';

@Component({
  selector: 'ngx-booking-add',
  templateUrl: './booking-add.component.html',
  styleUrls: ['./booking-add.component.scss'],
})
export class BookingAddComponent implements OnInit, OnDestroy {
  dataAddBooking= new AddBooking;
  roomInformation = new RoomInformation;
  roomListBooking: any;
  userCityHub: any;
  show: any;
  forRole: any;
  public subs= new Subject();
  businessSource: any;
  guest: any;
  country: any;
  modelGuest: any;
  modelBusinessSource: any;
  guestt = new Guest;
  source = new Source;

  // TODO: Setting disable date for arrival date and departure date
  min = new Date();
  max = new Date();

  // TODO: Setting for upload
  fileData = new FormData();
  reader = new FileReader();
  selectedFile: File = null;
  imgURL: any;
  constructor(
    public bookingServ: BookingService,
    public businessSourceServ: BusinessSourceService,
    public guestServ: GuestService,
    public notificationServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public roomTypeServ: RoomTypeService,
    public roomOperationServ: RoomOperationService,
    public datepipe: DatePipe,
    public router: Router,
    public notifServ: NotificationService,
    public countryServ: CountryService,
    protected dateService: NbDateService<Date>,
  ) {

  }

  ngOnInit() {
    this.detailAccount();
    this.getBusinessSource();
    this.getCountry();
    this.getGuest();
    this.minMax();
    // this.min = new Date(Date.now());
    // this.max = new Date(Date.now());
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  minMax() {
    const min = new Date()
    .setDate(new Date(Date.now())
    .getDate() - 1);
    this.min = new Date(min);
  }

  detailAccount() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data)
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      this.userCityHub = {
        name : res[0].full_name,
      };
      console.log(this.userCityHub);
    });
  }

  getBusinessSource() {
    this.businessSourceServ.get().pipe(takeUntil(this.subs)).subscribe(resBusinessSource => {
      this.businessSource = resBusinessSource.map((forResBusinessSource) => {
        const dataResBusinessSource = {
          businnessSourceId: forResBusinessSource.business_source_id,
          businnessSourceName: forResBusinessSource.business_source_name,
          businnessSourceDescription: forResBusinessSource.business_source_description,
        };
        return dataResBusinessSource;
      });
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
          email: forResGuest.email,
        };
        return dataResGuest;
      });
      console.log(resGuest);
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
      });
    });
  }

  searchGuest = (textGuest: Observable<string>) => textGuest
  .pipe(
    debounceTime(200),
    map(term => term === '' ? [] : this.guest
    .filter(v => v.guestName
      .toLowerCase()
      .indexOf(term
        .toLowerCase()) > -1)
        .slice(0, 10)),
    )
  formatterGuest = (x: {guestName: string}) => x.guestName;

  searchBusinessSource = (textBusinessSource: Observable<string>) => textBusinessSource
  .pipe(
    debounceTime(200),
    map(term => term === '' ? [] : this.businessSource
    .filter(v => v.businnessSourceName
      .toLowerCase()
      .indexOf(term.
        toLowerCase()) > -1)
        .slice(0, 10)),
  )
  formatterBusinessSource = (x: {businnessSourceName: string}) => x.businnessSourceName;

  onChangeBusinessSource(event) {
    if (event === '') {
      this.source = {
        businnessSourceId: 0,
        businnessSourceName: '',
      };
    } else {
      this.source = {
        businnessSourceId: event.businnessSourceId,
        businnessSourceName: event.businnessSourceName,
      };
    }
  }

  onChangeGuest(event) {
    if (event === '') {
      this.guestt = {
        guestId: 0,
        guestName: '',
        countryId: '',
        address: '',
        city: '',
        phoneNumber: '',
        guestFileScan: '',
        email: '',
      };
    } else {
      this.guestt = {
        guestId: event.guestId,
        guestName: event.guestName,
        countryId: event.countryId,
        address: event.address,
        city: event.city,
        email: event.email,
        phoneNumber: event.phoneNumber,
        guestFileScan: event.guestFileScan,
      };
      this.imgURL = event.guestFileScan;
    }
  }

  getInfo(event) {
    this.dataAddBooking.roomInformation = true;
    const departureDate = new Date()
    .setDate(new Date(this.dataAddBooking.arrivalDate)
    .getDate() + +event.target.value);
    this.dataAddBooking.departureDate = new Date(departureDate);
    const data = {
      arrivalDate: this.datepipe.transform( this.dataAddBooking.arrivalDate, 'yyyy-MM-dd'),
      departureDate: this.datepipe.transform( this.dataAddBooking.departureDate, 'yyyy-MM-dd'),
    };
    this.bookingServ.checkRoom(data)
    .pipe(takeUntil(this.subs))
    .subscribe(resCheckRoom => {
      this.roomInformation.roomInfo = resCheckRoom.room_information.map((y, index) => {
        const c = {
          roomTypeId: y.room_type_id,
          roomTypeName: y.room_type_name,
          available: y.available,
          maxAvaiable: y.available,
        };

        if (c.available > y.available) {
          c.available =  y.available;
        }

        return c;
      });
      console.log('resCHeckRoom', this.roomInformation);
      console.log('resCHeckRoom', this.roomInformation);
    });
  }

  checkRoomListBooking(event) {
    this.roomInformation.roomInfo.map((y) => {
      const yui = {
        maxAvaiable: y.available,
        available: y.available,
        roomTypeId: y.roomTypeId,
        roomTypeName: y.roomTypeName,
        check: event.checked,
      };
      return yui;
    });
  }

  onFile(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    this.reader.readAsDataURL(this.selectedFile);
    this.reader.onload = (_event) => {
      this.imgURL = this.reader.result;
    };

  }

  addBooking() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };

      console.log(this.forRole);

      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'booking_module';
        });

        if (filter[0].create_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].create_permision === 'not allowed') {
          this.show = false;
        } if (filter[0].read_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].read_permision === 'not allowed') {
          this.show = false;
        } if (filter[0].update_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].update_permision === 'not allowed') {
          this.show = false;
        } if (filter[0].delete_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].delete_permision === 'not allowed') {
          this.show = false;
        }

        const filterRoomListBooking = this.roomInformation.roomInfo.filter((y) => {
          return y.check === true;
        });

        const roomTypeId = filterRoomListBooking.map((x) => {
          return x.roomTypeId;
        });

        const numberOfRoom = filterRoomListBooking.map((x) => {
          return x.available;
        });

        // TODO: condition new Guest
        if (this.guestt.guestId === 0) {
          // ! data for add guest
          this.fileData.append('guestName', this.guestt.guestName);
          this.fileData.append('countryId', this.guestt.countryId);
          this.fileData.append('address', this.guestt.address);
          this.fileData.append('city', this.guestt.city);
          this.fileData.append('email', this.guestt.email);
          this.fileData.append('phoneNumber', this.guestt.phoneNumber);
          this.fileData.append('createdBy', this.userCityHub.name);
          this.fileData.append('image', this.selectedFile, this.selectedFile.name);

          this.guestServ.add(this.fileData).pipe(takeUntil(this.subs)).subscribe(resAddGuest => {
            const title = 'Guest';
            const content = 'Data has been saved';
            this.notifServ.showSuccessTypeToast(title, content);

            // ! data for new booking
            const dataAddBookingNull = {
              arrivalDate: this.datepipe.transform( this.dataAddBooking.arrivalDate, 'yyyy-MM-dd'),
              duration: this.dataAddBooking.duration,
              guestId: resAddGuest[0].guest_id,
              sourceId: this.source.businnessSourceId,
              createdBy: this.userCityHub.name,
              roomTypeId,
              numberOfRoom,
            };
            console.log('val-booking', dataAddBookingNull);
            this.bookingServ.addBooking(dataAddBookingNull)
            .pipe(takeUntil(this.subs))
            .subscribe(resAddBooking => {
              console.log('resAddBooking', resAddBooking);
              // TODO: after save otomatic go to booking detail

              const titleNull = 'Add Booking';
              const contentNull = 'Add booking successfully';
              this.notifServ.showSuccessTypeToast(titleNull, contentNull);
              this.router.navigate(['pages/booking-detail/' + resAddBooking.booking_information.booking_id]);
            }, err => {
              const titleNull = 'Error - Add Booking';
              const contentNull = 'Add booking not saved';
              this.notifServ.showDangerTypeToast(titleNull, contentNull);
            });
          }, err => {
            const title = 'User';
            const content = 'Error';
            this.notifServ.showInfoTypeToast(title, content);
          });
        } else {
            // TODO: Save New Booking

            // ! data for new booking
            const dataAddBooking = {
              arrivalDate: this.datepipe.transform( this.dataAddBooking.arrivalDate, 'yyyy-MM-dd'),
              duration: this.dataAddBooking.duration,
              guestId: this.guestt.guestId,
              sourceId: this.source.businnessSourceId,
              createdBy: this.userCityHub.name,
              roomTypeId,
              numberOfRoom,
            };
            console.log('val-booking', dataAddBooking);
            this.bookingServ.addBooking(dataAddBooking)
            .pipe(takeUntil(this.subs))
            .subscribe(resAddBooking => {
              console.log('resAddBooking', resAddBooking);
              // TODO: after save otomatic go to booking detail
              this.router.navigate(['pages/booking-detail/' + resAddBooking.booking_information.booking_id]);

              const title = 'Add Booking';
              const content = 'Add booking successfully';
              this.notifServ.showSuccessTypeToast(title, content);
              this.router.navigate(['pages/booking-detail/' + resAddBooking.booking_information.booking_id]);
            }, err => {
              const title = 'Error - Add Booking';
              const content = 'Add booking not saved';
              this.notifServ.showDangerTypeToast(title, content);
            });
        }
      });
    });
  }

}
