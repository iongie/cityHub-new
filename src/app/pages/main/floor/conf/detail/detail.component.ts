import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FloorService } from '../../../../../services/floor/floor.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { NotificationService } from '../../../../../services/notification/notification.service';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  floor: any;
  userCityHub: any;
  extraCharge: any;
  forRole: any;
  show: any;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private floorServ: FloorService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public notifServ: NotificationService,
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
      const floorId = {
        id: params.id,
      };
      this.floorServ.getById(floorId).pipe(takeUntil(this.subs)).subscribe(resById => {
        this.floor = resById.map((forResFloor) => {
          const dataForFloor = {
            floorId: forResFloor.floor_id,
            floorName: forResFloor.floor_name,
          };
          return dataForFloor;
        });
      });
    });
  }

  updateFloor() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        floorId: params.id,
        floorName: this.floor[0].floorName,
      };
      console.log(data);
      this.floorServ.update(data).pipe(takeUntil(this.subs)).subscribe(() => {
        const title = 'Floor';
        const content = 'Data has been update';
        this.notifServ.showSuccessTypeToast(title, content);
        this.router.navigate(['pages/floor']);
      }, err => {
        const title = 'Floor';
        const content = 'Error';
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
          return forResUserRole.module_name === 'floor_module';
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
