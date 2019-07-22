import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../../services/auth/auth.service';
import { SeasonService } from '../../../../../services/season/season.service';
import { SeasonTypeService } from '../../../../../services/season-type/season-type.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  season: any;
  seasonType: any;
  userCityHub: any;
  forRole: any;
  show: any;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private authServ: AuthService,
    private seasonServ: SeasonService,
    private seasonTypeServ: SeasonTypeService,
    private notifServ: NotificationService,
    public datepipe: DatePipe,
    public userRoleServ: UserRoleService,
  ) { }

  ngOnInit() {
    this.getSeasonType();
    this.detailAccount();
    this.viewById();
    this.detailUserRole();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getSeasonType() {
    this.seasonTypeServ.get().pipe(takeUntil(this.subs)).subscribe(seasonType => {
      const data = seasonType.map((y) => {
        const abc = {
          seasonTypeId: y.season_type_id,
          seasonTypeName: y.season_type_name,
          seasonTypeDesc: y.season_type_description,
          detail: y.season_type_id,
        };
        return abc;
      });
      this.seasonType = data;
      console.log(this.seasonType);
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
      const seasonId = {
        id: params.id,
      };

      this.seasonServ.getById(seasonId).pipe(takeUntil(this.subs)).subscribe(resById => {
        console.log(resById);
        this.season = resById.map((y) => {
          const xyz = {
            name: y.season_name,
            typeId: y.season_type_id,
            desc: y.season_description,
            fromDate: new Date(y.from_date),
            toDate: new Date(y.to_date),
            startDate : new Date(y.start_date),
            endDate : new Date(y.end_date),
            createdBy: y.create_by,
            seasonId: params.id,
          };
          return xyz;
        });
      });
    });
  }

  updateSeason() {
    console.log(this.season);
    const data = {
      seasonName: this.season[0].name,
      seasonTypeId: this.season[0].typeId,
      seasonDescription: this.season[0].desc,
      fromDate: this.datepipe.transform(this.season[0].fromDate, 'yyyy-MM-dd'),
      toDate: this.datepipe.transform(this.season[0].toDate, 'yyyy-MM-dd'),
      startDate : this.datepipe.transform(this.season[0].startDate, 'yyyy-MM-dd'),
      endDate : this.datepipe.transform(this.season[0].endDate, 'yyyy-MM-dd'),
      createdBy: this.userCityHub.username,
      seasonId: this.season[0].seasonId,
    };

    this.seasonServ.update(data).pipe(takeUntil(this.subs)).subscribe(res => {
      const title = 'Season';
      const content = 'Data has been updated';
      this.notifServ.showSuccessTypeToast(title, content);
      this.router.navigate(['pages/season']);
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
      });
    });
  }

}
