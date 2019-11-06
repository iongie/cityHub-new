import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusinessSourceService } from '../../../services/business-source/business-source.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit, OnDestroy {
  source: LocalDataSource;
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  settings = {
    actions: {
      add: true,
      edit: true,
      delete: true,
    },
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
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      businessSourceName: {
        title: 'Name',
        type: 'string',
      },
      businessSourceDescription: {
        title: 'Description',
        type: 'string',
      },
    },
  };
  constructor(
    public sourceServ: BusinessSourceService,
    public notifServ: NotificationService,
    public router: Router,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
  ) { }

  ngOnInit() {
    this.refreshSeason();
    this.getSource();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getSource() {
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
          return forResUserRole.module_name === 'business_source_module';
        });

        filter.map((r) => {
          if (r.create_permision === 'allowed') {
            this.show = true;
            console.log('create - allowed');
            this.settings.actions.add = true;
            this.settings = Object.assign({}, this.settings);
          }else if (r.create_permision === 'not allowed') {
            this.show = false;
            console.log('create - not allowed');
            this.settings.actions.add = false;
            this.settings = Object.assign({}, this.settings);
          }

          if (r.read_permision === 'allowed') {
            this.show = true;
            console.log('read - allowed');
            
          }else if (r.read_permision === 'not allowed') {
            this.show = false;
            console.log('read - not allowed');
          }

          if (r.update_permision === 'allowed') {
            this.show = true;
            console.log('update - allowed');
            this.settings.actions.edit = true;
            this.settings = Object.assign({}, this.settings);
          }else if (r.update_permision === 'not allowed') {
            this.show = false;
            console.log('update - not allowed');
            this.settings.actions.edit = false;
            this.settings = Object.assign({}, this.settings);
          }

          if (r.delete_permision === 'allowed') {
            this.show = true;
            console.log('delete - allowed');
            this.settings.actions.delete = true;
            this.settings = Object.assign({}, this.settings);
          }else if (r.delete_permision === 'not allowed') {
            this.show = false;
            console.log('delete - not allowed');
            this.settings.actions.delete = false;
            this.settings = Object.assign({}, this.settings);
          }
        });


        this.sourceServ.get().pipe(takeUntil(this.subs)).subscribe(res => {
          const data = res.map(x => {
            const datax = {
              id: x.business_source_id,
              businessSourceName: x. business_source_name,
              businessSourceDescription: x.business_source_description,
              createdAt: x.business_source_created_at,
              updateAt: x.business_source_updated_at
            };
    
            return datax;
          });
    
          this.source = new LocalDataSource(data);
        })

        
      });
    });
  }

  refreshSeason() {
    this.sourceServ.refresh.subscribe(() => {
      this.getSource();
    });
  }

  onCreate(event) {
    console.log('event', event.newData);
    const data = {
      businessSourceName: event.newData.businessSourceName,
      businessSourceDescription: event.newData.businessSourceDescription,
    };
    this.sourceServ.add(data).pipe(takeUntil(this.subs)).subscribe(() => {
      const title = 'Business Source';
      const content = 'Data successfully created';
      this.notifServ.showSuccessTypeToast(title, content);
      event.confirm.resolve(event.newData);
    }, err => {
      const title = 'Business Source';
      const content = 'Data failed to created';
      this.notifServ.showInfoTypeToast(title, content);
    });
  }

  onUpdate(event) {
    console.log('onUpdateWeekdays', event.newData);
    const data = {
      businessSourceId: event.newData.id,
      businessSourceName: event.newData.businessSourceName,
      businessSourceDescription: event.newData.businessSourceDescription,
    };
    this.sourceServ.update(data).pipe(takeUntil(this.subs)).subscribe(() => {
      const title = 'Business Source';
      const content = 'Data successfully updated';
      this.notifServ.showSuccessTypeToast(title, content);
      event.confirm.resolve(event.newData);
    }, err => {
      const title = 'Business Source';
      const content = 'Data failed to updated';
      this.notifServ.showInfoTypeToast(title, content);
    });
  }

  onDelete(event) {
    console.log('onUpdateWeekdays', event.newData);
    const data = {
      businessSourceId: event.newData.id,
    };
    this.sourceServ.delete(data).pipe(takeUntil(this.subs)).subscribe(() => {
      const title = 'Business Source';
      const content = 'Data successfully deleted';
      this.notifServ.showSuccessTypeToast(title, content);
      event.confirm.resolve(event.newData);
    }, err => {
      const title = 'Business Source';
      const content = 'Data failed to deleted';
      this.notifServ.showInfoTypeToast(title, content);
    });
  }
}
