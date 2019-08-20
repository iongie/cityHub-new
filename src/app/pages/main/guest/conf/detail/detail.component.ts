import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../../services/auth/auth.service';
import { GuestService } from '../../../../../services/guest/guest.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';
import { CountryService } from '../../../../../services/country/country.service';


@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  guest: any;
  country: any;
  userCityHub: any;
  forRole: any;
  show: any;
  
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private authServ: AuthService,
    private guestServ: GuestService,
    private countryServ: CountryService,
    private notifServ: NotificationService,
    public datepipe: DatePipe,
    public userRoleServ: UserRoleService,
  ) { }

  ngOnInit() {
    this.getCountry();
    this.detailAccount();
    this.viewById();
    this.detailUserRole();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getCountry() {
    this.countryServ.get().pipe(takeUntil(this.subs)).subscribe(country => {
      const data = country.map((y) => {
        const abc = {
          countryId: y.country_id,
          countryName: y.country_name,
        };
        return abc;
      });
      this.country = data;
      console.log(this.country);
    });
  }

  detailAccount() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data).pipe(takeUntil(this.subs)).subscribe(res => {
      this.userCityHub = {
        name : res[0].full_name,
      };
      console.log(this.userCityHub.name);
    });
  }

  viewById() {
    this.activeRoute.params.subscribe(params => {
      const guestId = {
        id: params.id,
      };

      this.guestServ.getById(guestId).pipe(takeUntil(this.subs)).subscribe(resById => {
        console.log(resById);
        this.guest = resById.map((y) => {
          const xyz = {
            guestName: y.guest_name,
            countryId: y.country_id,
            city: y.city,
            email: y.email,
            address: y.address,
            phoneNumber: y.phone_number,
            // guestFileScan: y.guest_file_scan,
            createdBy: y.create_by,
            guestId: params.id,
          };
          return xyz;
        });
      });
    });
  }

  updateGuest() {
    console.log(this.guest);
    const data = {
      guestName: this.guest[0].guestName,
      countryId: this.guest[0].countryId,
      city: this.guest[0].city,
      email: this.guest[0].email,
      phoneNumber: this.guest[0].phoneNumber,
      address: this.guest[0].address,
      // guestFileScan: this.guest[0].guestFileScan,
      createdBy: this.userCityHub.username,
      guestId: this.guest[0].guestId,
    };

    this.guestServ.update(data).pipe(takeUntil(this.subs)).subscribe(res => {
      const title = 'Guest';
      const content = 'Data has been updated';
      this.notifServ.showSuccessTypeToast(title, content);
      this.router.navigate(['pages/guest']);
    }, err => {
      const title = 'User';
      const content = 'Error';
      this.notifServ.showInfoTypeToast(title, content);
    });
  }

  detailUserRole() {
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
          return forResUserRole.module_name === 'guest_module';
        });

        if (filter[0].create_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].create_permision === 'not allowed') {
          this.show = false;
        }else if (filter[0].read_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].read_permision === 'not allowed') {
          this.show = false;
        }else if (filter[0].update_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].update_permision === 'not allowed') {
          this.show = false;
        }else if (filter[0].delete_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].delete_permision === 'not allowed') {
          this.show = false;
        }
      });
    });
  }

}
