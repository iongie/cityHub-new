import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SeasonTypeService } from '../../../../../services/season-type/season-type.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  seasonType: any;
  forRole: any;
  show: any;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private seasonTypeService: SeasonTypeService,
    public authServ: AuthService,
    private notifServ: NotificationService,
    public userRoleServ: UserRoleService,
  ) { }

  ngOnInit() {
    this.viewById();
    this.detailUserRole();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  viewById() {
    this.activeRoute.params.subscribe(params => {
      const seasonTypeId = {
        id: params.id,
      };
      this.seasonTypeService.getById(seasonTypeId).pipe(takeUntil(this.subs)).subscribe(resById => {
        const data = resById.map((y) => {
          const xyz = {
            seasonTypeDesc: y.season_type_description,
            seasonTypeId: y.season_type_id,
            seasonTypeName: y.season_type_name,
          };
          return xyz;
        });
        this.seasonType = data;
        console.log('this.seasonType', this.seasonType);
      });
    });
  }

  updateSeasonType() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        userId: params.id,
        seasonTypeDescription: this.seasonType[0].seasonTypeDesc,
        seasonTypeId: this.seasonType[0].seasonTypeId,
        seasonTypeName: this.seasonType[0].seasonTypeName,
      };
      this.seasonTypeService.update(data).pipe(takeUntil(this.subs)).subscribe(() => {
        const title = 'Season type';
        const content = 'Data has been updated';
        this.notifServ.showSuccessTypeToast(title, content);
        this.router.navigate(['pages/season-type']);
      }, err => {
        const title = 'User';
        const content = 'Error Data';
        this.notifServ.showInfoTypeToast(title, content);
      });
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
      });
    });
  }

}
