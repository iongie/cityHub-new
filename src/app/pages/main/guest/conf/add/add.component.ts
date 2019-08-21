import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { GuestService } from '../../../../../services/guest/guest.service';
import { CountryService } from '../../../../../services/country/country.service';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit, OnDestroy {
 guest = {
  guestName: '',
  address: '',
  city: '',
  countryId: '',
  email: '',
  phoneNumber: '',
  // guestFileScan: '',
  };

  private subs: Subject<void> = new Subject();
  userCityHub: any;
  country: any;
  forRole: any;
  show: any;
  constructor(
    public datepipe: DatePipe,
    public notifServ: NotificationService,
    public guestServ: GuestService,
    public authServ: AuthService,
    public router: Router,
    public countryServ: CountryService,
    public userRoleServ: UserRoleService,
  ) { }

  ngOnInit() {
    this.getCountry();
    this.detailAccount();
    this.detailUserRole();
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
      })
      
    console.log(resCountry);
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
      console.log(res);
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

  addGuest() {
    const data = {
      guestName: this.guest.guestName,
      countryId: this.guest.countryId,
      address: this.guest.address,
      city: this.guest.city,
      email: this.guest.email,
      phoneNumber: this.guest.phoneNumber,
      // guestFileScan: this.guest.guestFileScan,
      createdBy: this.userCityHub.username,
    };
    console.log(data);
    this.guestServ.add(data).pipe(takeUntil(this.subs)).subscribe(res => {
      const title = 'Guest';
      const content = 'Data has been saved';
      this.notifServ.showSuccessTypeToast(title, content);
      this.router.navigate(['pages/guest']);
    }, err => {
      const title = 'User';
      const content = 'Error';
      this.notifServ.showInfoTypeToast(title, content);
    });
  }

}
