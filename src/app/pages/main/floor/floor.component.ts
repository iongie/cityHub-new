import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { FloorService } from '../../../services/floor/floor.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';
import { StatusComponent } from './conf/status/status.component';


@Component({
  selector: 'ngx-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss'],
})
export class FloorComponent implements OnInit, OnDestroy {
  floor: LocalDataSource;
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  settings = {
    actions: false,
    columns: {
      floorName: {
        title: 'Name',
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
    public floorServ: FloorService,
    public notifServ: NotificationService,
    public router: Router,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
  ) { }

  ngOnInit() {
    this.getFloor();
    this.refreshFloor();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getFloor() {
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

        this.floorServ.get().pipe(takeUntil(this.subs)).subscribe(floor => {
          const data =  floor.map((y) => {
            const z = {
              floorName: y.floor_name,
              floorStatus: y.floor_db_status,
              floorId: y.floor_id,
              status: {
               floorStatus: y.floor_db_status,
              },
              detail: {
                floorId: y.floor_id,
                floorStatus: y.floor_db_status,
                floorRoleCreate: filter[0].create_permision,
                floorRoleRead: filter[0].read_permision,
                floorRoleUpdate: filter[0].update_permision,
                floorRoleDelete: filter[0].delete_permision,
              },
            };
            return z;
          });
          this.floor = new LocalDataSource (data);
        });
      });
    });
  }

  onCreateConfirm(event) {
    const data = {
      floorName : event.newData.floorName,
      floorDbStatus : event.newData.floorStatus,
    };
    this.floorServ.add(data).subscribe(() => {
      const title = 'Floor';
      const content = 'Data has been saved';
      setTimeout(() => {
        this.notifServ.showSuccessTypeToast(title, content);
      }, 2000);
      setTimeout(() => {
        event.confirm.resolve(event.newData);
        this.getFloor();
      }, 1000);
    });
  }

  onUpdateConfirm(event) {
    const data = {
      id: event.newData.floorId,
      floorName : event.newData.floorName,
    };
    this.floorServ.update(data).subscribe(() => {
      const title = 'Floor';
      const content = 'Data has been updated';
      setTimeout(() => {
        this.notifServ.showInfoTypeToast(title, content);
      }, 2000);
      setTimeout(() => {
        this.getFloor();
      }, 1000);
    });
  }

  onDeleteConfirm(event) {
    const data = {
      id: event.data.floor_id,
    };
    this.floorServ.delete(data).subscribe(() => {
      const title = 'Floor';
      const content = 'Data has been deleted';
      setTimeout(() => {
        this.notifServ.showDangerTypeToast(title, content);
      }, 2000);
      event.confirm.resolve(event.newData);
      setTimeout(() => {
        this.getFloor();
      }, 1000);
    });
  }

  refreshFloor() {
    this.floorServ.refresh.subscribe(() => {
      this.getFloor();
    });
  }

  toFormAdd() {
    this.router.navigate(['/pages/add-floor']);
  }

}
