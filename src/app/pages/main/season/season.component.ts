import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { SeasonService } from '../../../services/season/season.service';
import { SeasonTypeService } from '../../../services/season-type/season-type.service';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';
import { StatusComponent } from './conf/status/status.component';

@Component({
  selector: 'ngx-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss'],
})
export class SeasonComponent implements OnInit, OnDestroy {
  season: LocalDataSource;
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  settings = {
    actions: false,
    columns: {
      seasonName: {
        title: 'Name',
        type: 'string',
      },
      seasonTypeName: {
        title: 'Type',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'custom',
        renderComponent: StatusComponent,
        filter: false,
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
    public seasonServ: SeasonService,
    public seasonTypeServ: SeasonTypeService,
    public notifServ: NotificationService,
    public router: Router,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
  ) { }

  ngOnInit() {
    this.getSeason();
    this.refreshSeason();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getSeason() {
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
          return forResUserRole.module_name === 'season_module';
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

        this.seasonServ.get().pipe(takeUntil(this.subs)).subscribe(season => {
          this.seasonTypeServ.get().pipe(takeUntil(this.subs)).subscribe(seasonType => {
            console.log('seasonType', seasonType);
            const dataSeasonTypeId = season.map((y) => {
              const xyz = seasonType.filter((z) => {
                return z.season_type_id === y.season_type_id;
              });
              console.log('xyz', xyz);
              const sdf =  {
                seasonCreatedAt: y.created_at,
                seasonCreatedBy: y.created_by,
                seasonEndDate: y.end_date,
                seasonFromDate: y.from_date,
                seasonDesc: y.season_description,
                seasonId: y.season_id,
                seasonName: y.season_name,
                seasonTypeId: y.season_type_id,
                seasonStatus: y.season_status,
                seasonTypeName: xyz[0].season_type_name,
                seasonTypeDesc: xyz[0].season_type_description,
                seasonStartDate: y.start_date,
                seasonToDate: y.to_date,
                seasonupdateAt: y.updated_at,
                seasonUpdateBy: y.updated_by,
                status: {
                  seasonStatus: y.season_status,
                },
                detail: {
                  seasonId: y.season_id,
                  seasonStatus: y.season_status,
                  seasonRoleCreate: filter[0].create_permision,
                  seasonRoleRead: filter[0].read_permision,
                  seasonRoleUpdate: filter[0].update_permision,
                  seasonRoleDelete: filter[0].delete_permision,
                },
              };
              return sdf;
            });
            this.season = new LocalDataSource (dataSeasonTypeId);
            console.log('dataSeasonTypeId', dataSeasonTypeId);
          });
        });
      });
    });
  }

  refreshSeason() {
    this.seasonServ.refresh.subscribe(() => {
      this.getSeason();
    });
  }

  toFormAdd() {
    this.router.navigate(['/pages/add-season']);
  }

}
