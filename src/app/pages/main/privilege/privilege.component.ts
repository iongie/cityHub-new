import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { PrivilegeService } from '../../../services/privilege/privilege.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.scss'],
})
export class PrivilegeComponent implements OnInit, OnDestroy {
  privilege: LocalDataSource;
  private subs: Subject<void> = new Subject();
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    actions: { delete: false },
    columns: {
      privilegeName: {
        title: 'Name',
        type: 'string',
      },
      privilegeDescription: {
        title: 'Description',
        type: 'string',
      },
    },
  };
  constructor(
    public privilegeServ: PrivilegeService,
    public notifServ: NotificationService,
  ) { }

  ngOnInit() {
    this.getPrivilege();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getPrivilege() {
    this.privilegeServ.get().pipe(takeUntil(this.subs)).subscribe(privilege => {
      const data = privilege.map((y) => {
        const xyz = {
          privilegeId: y.privilege_id,
          privilegeName : y.privilege_name,
          privilegeDescription : y.privilege_description,
        };
        return xyz;
      });
      this.privilege = new LocalDataSource (data);
    });
  }

  onCreateConfirm(event) {
    const data = {
      privilegeName : event.newData.privilegeName,
      privilegeDescription : event.newData.privilegeDescription,
    };
    this.privilegeServ.add(data).subscribe(() => {
      const title = 'Privilege';
      const content = 'Data has been saved';
      setTimeout(() => {
        this.notifServ.showSuccessTypeToast(title, content);
      }, 2000);
      setTimeout(() => {
        event.confirm.resolve(event.newData);
        this.getPrivilege();
      }, 1000);
    });
  }

  onUpdateConfirm(event) {
    const data = {
      privilegeId: event.newData.privilegeId,
      privilegeName : event.newData.privilegeName,
      privilegeDescription : event.newData.privilegeDescription,
    };
    this.privilegeServ.update(data).subscribe(() => {
      const title = 'Privilege';
      const content = 'Data has been updated';
      setTimeout(() => {
        this.notifServ.showInfoTypeToast(title, content);
      }, 2000);
      setTimeout(() => {
        this.getPrivilege();
      }, 1000);
    });
  }

  onDeleteConfirm(event) {
    const data = {
      privilegeId: event.data.privilegeId,
    };
    this.privilegeServ.delete(data).subscribe(() => {
      const title = 'Privilege';
      const content = 'Data has been deleted';
      setTimeout(() => {
        this.notifServ.showDangerTypeToast(title, content);
      }, 2000);
      event.confirm.resolve(event.newData);
      setTimeout(() => {
        this.getPrivilege();
      }, 1000);
    });
  }

}
