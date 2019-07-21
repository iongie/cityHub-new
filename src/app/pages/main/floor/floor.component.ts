import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { FloorService } from '../../../services/floor/floor.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss'],
})
export class FloorComponent implements OnInit, OnDestroy {
  floor: LocalDataSource;
  private subs: Subject<void> = new Subject();
  settings = {
    actions: false,
    columns: {
      floorName: {
        title: 'Name',
        type: 'string',
      },
      floorStatus: {
        title: 'Status',
        editable: false,
        type: 'string',
      },
      detail: {
        title: 'Detail',
        type: 'custom',
        renderComponent: LinkDetailComponent,
      },
    },
  };
  constructor(
    public floorServ: FloorService,
    public notifServ: NotificationService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.getFloor();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getFloor() {
    this.floorServ.get().pipe(takeUntil(this.subs)).subscribe(floor => {
      const data =  floor.map((y) => {
        const z = {
          floorName: y.floor_name,
          floorStatus: y.floor_db_status,
          floorId: y.floor_id,
          detail: {
            floorId: y.floor_id,
            floorStatus: y.floor_db_status,
          },
        };
        return z;
      });
      this.floor = new LocalDataSource (data);
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

  toFormAdd() {
    this.router.navigate(['/pages/add-user']);
  }

}
