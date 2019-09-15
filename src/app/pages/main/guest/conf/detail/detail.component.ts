import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GuestService } from '../../../../../services/guest/guest.service';
import { CountryService } from '../../../../../services/country/country.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
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
    public guestServ: GuestService,
    public countryServ: CountryService,
    public authServ: AuthService,
    private notifServ: NotificationService,
    public userRoleServ: UserRoleService,
  ) { }

  ngOnInit() {
    this.viewById();
    this.detailUserRole();
    this.getCountry();
    this.detailAccount();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
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
    console.log(resCountry);
    });
  }

  viewById() {
    this.activeRoute.params.subscribe(params => {
      const guestId = {
        id: params.id,
      };
      this.guestServ.getById(guestId).pipe(takeUntil(this.subs)).subscribe(resById => {
        console.log(resById);
        const data = resById.map((y) => {
          const xyz = {
            countryId : y.country_id,
            guestName : y.guest_name,
            address : y.address,
            city : y.city,
            email : y.email,
            phoneNumber : y.phone_number,
            // guestFileScan : y.guest_file_scan,
            createdBy: y.create_by,
            guestId: params.id,
          };
          return xyz;
        });
        this.guest = data;
        console.log(this.guest);
      });
    });
  }

  updateGuest() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        guestName: this.guest[0].guestName,
        countryId: this.guest[0].countryId,
        city: this.guest[0].city,
        address: this.guest[0].address,
        email: this.guest[0].email,
        phoneNumber: this.guest[0].phoneNumber,
        // guestFileScan: this.guest[0].guestFileScan,
        createdBy: this.userCityHub.username,
        guestId: this.guest[0].guestId,
      };
      this.guestServ.update(data).pipe(takeUntil(this.subs)).subscribe(() => {
        const title = 'Guest';
        const content = 'Data has been update';
        this.notifServ.showSuccessTypeToast(title, content);
        this.router.navigate(['pages/guest']);
      }, err => {
        const title = 'Guest';
        const content = 'Error data';
        this.notifServ.showInfoTypeToast(title, content);
      });
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
