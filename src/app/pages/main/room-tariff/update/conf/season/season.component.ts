import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationService } from '../../../../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { SeasonService } from '../../../../../../services/season/season.service';
import { takeUntil } from 'rxjs/operators';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss'],
})
export class SeasonComponent implements OnInit, OnDestroy, ViewCell {
  renderValue: any;
  season: any;
  roomTariffSeason = [{
    seasonId: '',
  }];
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  @Input() value: any;
  @Input() rowData: any;
  constructor(
    public notifServ: NotificationService,
    public router: Router,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public seasonServ: SeasonService,
  ) { }

  ngOnInit() {
    // this.getOfRoomTariff();
    this.getSeason();
    this.refreshSeason();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getOfRoomTariff() {
    this.roomTariffSeason[0].seasonId = this.value;
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
          this.season = season.map((y) => {
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
              seasonStartDate: y.start_date,
              seasonToDate: y.to_date,
              seasonupdateAt: y.updated_at,
              seasonUpdateBy: y.updated_by,
            };

            return sdf;
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

}
