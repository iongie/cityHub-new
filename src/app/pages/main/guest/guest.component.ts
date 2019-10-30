import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject, combineLatest } from 'rxjs';
import { NotificationService } from '../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';
import { CountryService } from '../../../services/country/country.service';

import { GuestService } from '../../../services/guest/guest.service';

@Component({
  selector: 'ngx-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {
  guest: LocalDataSource;
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  country: any;
  settings = {
    actions: false,
    columns: {
      guestName: {
        title: 'Name',
        type: 'string',
      },
      address: {
        title: 'Address',
        type: 'string',
      },
      city: {
        title: 'City',
        type: 'string',
      },
      countryName: {
        title: 'Country',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      phoneNumber: {
        title: 'Phone',
        type: 'string',
      },
      // guestFileScan: {
      //   title: 'File',
      //   type: 'string',
      // },
      detail: {
        title: 'Actions',
        type: 'custom',
        renderComponent: LinkDetailComponent,
        filter: false,
      },
    },
  };
  constructor(
    public guestServ: GuestService,
    public countryServ: CountryService,
    public notifServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.getGuest();
    this.getCountry();
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
    });
  }

  getGuest() {
    const token = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(token).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };

      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'guest_module';
        });

        if (filter[0].create_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].create_permision === 'not allowed') {
          this.show = false;
        }if (filter[0].read_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].read_permision === 'not allowed') {
          this.show = false;
        }if (filter[0].update_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].update_permision === 'not allowed') {
          this.show = false;
        }if (filter[0].delete_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].delete_permision === 'not allowed') {
          this.show = false;
        }

        combineLatest(
          this.guestServ.get(),
          this.countryServ.get(),
        )
        .pipe(takeUntil(this.subs))
        .subscribe(res => {
          const guest = res[0];
          const country = res[1];

          const data = guest.map(x => {
            const filterGuest = country.filter(y => {
              return x.country_id === y.country_id;
            });
            
            const data = {
              guestId: x.guest_id,
              guestName : x.guest_name,
              address : x.address,
              city : x.city,
              countryId : x.country_id,
              countryName: filterGuest[0].country_name,
              email : x.email,
              phoneNumber : x.phone_number,
              guestFileScan : x.guest_file_scan,
              detail: {
                guestId: x.guest_id,
                guestRoleCreate: filter[0].create_permision,
                guestRoleRead: filter[0].read_permision,
                guestRoleUpdate: filter[0].update_permision,
                guestRoleDelete: filter[0].delete_permision,
              },
            };
            return data;
          });

          this.guest = new LocalDataSource(data);
        });
      });
    });
  }
  toFormAdd() {
    this.router.navigate(['/pages/add-guest']);
  }
}
