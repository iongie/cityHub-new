import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { SeasonTypeService } from '../../../services/season-type/season-type.service';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'ngx-season-type',
  templateUrl: './season-type.component.html',
  styleUrls: ['./season-type.component.scss'],
})
export class SeasonTypeComponent implements OnInit, OnDestroy {
  seasonType: LocalDataSource;
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  settings = {
    actions: false,
    columns: {
      seasonTypeName: {
        title: 'Name',
        type: 'string',
      },
      seasonTypeDesc: {
        title: 'Description',
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
    public seasonTypeServ: SeasonTypeService,
    public notifServ: NotificationService,
    public router: Router,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
  ) { }

  ngOnInit() {
    this.getSeasonType();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getSeasonType() {
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
          return forResUserRole.module_name === 'season_type_module';
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

        this.seasonTypeServ.get().pipe(takeUntil(this.subs)).subscribe(seasonType => {
          const data = seasonType.map((y) => {
            const abc = {
              seasonTypeId: y.season_type_id,
              seasonTypeName: y.season_type_name,
              seasonTypeDesc: y.season_type_description,
              detail: {
                seasonTypeId: y.season_type_id,
                seasonTypeRoleCreate: filter[0].create_permision,
                seasonTypeRoleRead: filter[0].read_permision,
                seasonTypeRoleUpdate: filter[0].update_permision,
                seasonTypeRoleDelete: filter[0].delete_permision,
              },
            };
            return abc;
          });
          console.log(data);
          this.seasonType = new LocalDataSource (data);
        });
      });
    });
  }

  toFormAdd() {
    this.router.navigate(['/pages/add-season-type']);
  }

}
