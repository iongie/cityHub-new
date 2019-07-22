import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SeasonService } from '../../../../../services/season/season.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';
import { SeasonTypeService } from '../../../../../services/season-type/season-type.service';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  season = {
    name: '',
    typeId: '',
    desc: '',
    fromDate: new Date(),
    toDate: new Date(),
    startDate : new Date(),
    endDate : new Date(),
    createBy: '',
  };
  private subs: Subject<void> = new Subject();
  seasonType: any;
  userCityHub: any;
  forRole: any;
  show: any;
  constructor(
    public datepipe: DatePipe,
    public notifServ: NotificationService,
    public seasonServ: SeasonService,
    public seasonTypeServ: SeasonTypeService,
    public authServ: AuthService,
    public router: Router,
    public userRoleServ: UserRoleService,
  ) { }

  ngOnInit() {
    this.getSeasonType();
    this.detailAccount();
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
      console.log(res);
    });
  }

  addSeason() {
    const data = {
      seasonName: this.season.name,
      seasonTypeId: this.season.typeId,
      seasonDescription: this.season.desc,
      fromDate: this.datepipe.transform(this.season.fromDate, 'yyyy-MM-dd'),
      toDate: this.datepipe.transform(this.season.toDate, 'yyyy-MM-dd'),
      startDate : this.datepipe.transform(this.season.startDate, 'yyyy-MM-dd'),
      endDate : this.datepipe.transform(this.season.endDate, 'yyyy-MM-dd'),
      createdBy: this.userCityHub.username,
    };
    console.log(data);
    this.seasonServ.add(data).pipe(takeUntil(this.subs)).subscribe(res => {
      const title = 'Season';
      const content = 'Data has been saved';
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
