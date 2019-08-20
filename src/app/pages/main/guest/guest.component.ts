import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
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
  settings = {
    actions: false,
    columns: {
      guestName: {
        title: 'Name',
        type: 'string',
      },
      guestAddress: {
        title: 'Address',
        type: 'string',
      },
      guestCity: {
        title: 'City',
        type: 'boolean',
      },
      guestEmail: {
        title: 'Email',
        type: 'string',
      },
      guestPhone: {
        title: 'Phone',
        type: 'string',
      },
      guestFile: {
        title: 'File',
        type: 'string',
      },
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
    public countrycountryServ: CountryService,
    public notifServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.getGuest();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }
  getGuest() {
    const token = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(token).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };

      console.log(this.forRole);

      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'extra_charge_category_module';
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

        this.guestServ.get().pipe(takeUntil(this.subs)).subscribe(resGuest => {
          const data = resGuest.map((forResGuest) => {
            const dataForResGuest = {
              guestId: forResGuest.guest_id,
              guestName : forResGuest.guest_name,
              guestAddress : forResGuest.address,
              guestCity : forResGuest.city,
              guestCountry : forResGuest.country_id,
              guestEmail : forResGuest.email,
              guestPhone : forResGuest.phone_number,
              guestFile : forResGuest.guest_file_scan,
              detail: {
                guestId: forResGuest.guest_id,
                guestRoleCreate: filter[0].create_permision,
                guestRoleRead: filter[0].read_permision,
                guestRoleUpdate: filter[0].update_permision,
                guestRoleDelete: filter[0].delete_permision,
              },
            };
            return dataForResGuest;
          });
          console.log('dataGuest', data);
          this.guest = new LocalDataSource (data);
        });
      });
    });
  }
  toFormAdd() {
    this.router.navigate(['/pages/add-guest']);
  }
}
