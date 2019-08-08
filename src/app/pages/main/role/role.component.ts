import { PrivilegeService } from './../../../services/privilege/privilege.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../services/auth/auth.service';
import { ModuleService } from '../../../services/module/module.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit, OnDestroy {
  roleUser: LocalDataSource;
  privilege: any;
  module: any;
  filterRoleUser = {
    privilegeRoleUser: '',
    moduleRoleUser: '',
  };
  eventPrivilege: any;
  eventModule: any;
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  actionRow: any;
  selectValue: any;
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
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
      createPermision: {
        title: 'Create permission',
        editor: {
          type: 'list',
          config: {
            list : [
              {value: 'allowed', title: 'allowed'},
              {value: 'allowed', title: 'not allowed'},
            ],
          },
        },
      },
      readPermision: {
        title: 'Read permission',
        editor: {
          type: 'list',
          config: {
            list : [
              {value: 'allowed', title: 'allowed'},
              {value: 'allowed', title: 'not allowed'},
            ],
          },
        },
      },
      updatePermision: {
        title: 'Update permission',
        editor: {
          type: 'list',
          config: {
            list : [
              {value: 'allowed', title: 'allowed'},
              {value: 'allowed', title: 'not allowed'},
            ],
          },
        },
      },
      deletePermision: {
        title: 'Delete permission',
        editor: {
          type: 'list',
          config: {
            list : [
              {value: 'allowed', title: 'allowed'},
              {value: 'allowed', title: 'not allowed'},
            ],
          },
        },
      },
      moduleName: {
        title: 'Module name',
        type: 'string',
        editable: false,
      },
      privilegeName: {
        title: 'privilege name',
        type: 'string',
        editable: false,
      },
    },
  };

  constructor(
    public notifServ: NotificationService,
    public router: Router,
    public userRoleServ: UserRoleService,
    public privilegeServ: PrivilegeService,
    public authServ: AuthService,
    public moduleServ: ModuleService,
  ) { }

  ngOnInit() {
    this.getRole();
    this.getPrivilege();
    this.refreshRole();
    this.getModule();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  refreshRole() {
    this.userRoleServ.refresh.subscribe(() => {
      this.getRole();
    });
  }

  getRole() {
    const token = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(token).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };

      console.log(this.forRole);

      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        // tslint:disable-next-line: no-shadowed-variable
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'room_tariff_module';
        });

        console.log('filter', filter);

        filter.map((r) => {
          if (r.create_permision === 'allowed') {
            this.show = true;
            console.log('create - allowed');
          }else if (r.create_permision === 'not allowed') {
            this.show = false;
            console.log('create - not allowed');
          }

          if (r.read_permision === 'allowed') {
            this.show = true;
          }else if (r.read_permision === 'not allowed') {
            this.show = false;
          }

          if (r.update_permision === 'allowed') {
            this.show = true;
            this.settings.actions.edit = true;
            this.settings = Object.assign({}, this.settings);
          }else if (r.update_permision === 'not allowed') {
            this.show = false;
            this.settings.actions.edit = false;
            this.settings = Object.assign({}, this.settings);
          }

          if (r.delete_permision === 'allowed') {
            this.show = true;
          }else if (r.delete_permision === 'not allowed') {
            this.show = false;
          }
        });

        this.userRoleServ.get().pipe(takeUntil(this.subs)).subscribe(resRole => {
          this.privilegeServ.get().pipe(takeUntil(this.subs)).subscribe(resPrivilege => {
            const ret = resPrivilege.map((forResPrivilege) => {
              const data = resRole.map((forResRole) => {
                const dataResRole = {
                  userRoleId: forResRole.user_role_id,
                  createPermision: forResRole.create_permision,
                  readPermision: forResRole.read_permision,
                  updatePermision: forResRole.update_permision,
                  deletePermision: forResRole.delete_permision ,
                  moduleId: forResRole.module_id,
                  privilegeId: forResRole.privilege_id,
                  privilegeName: forResPrivilege.privilege_name,
                  moduleName: forResRole.module_name,
                  moduleDesc: forResRole.module_description,
                };
                return dataResRole;
              });

              this.roleUser = new LocalDataSource (data);
            });
          });

        });
      });
    });
  }

  getPrivilege() {
    this.privilegeServ.get().pipe(takeUntil(this.subs)).subscribe(resPrivilege => {
      const ret = resPrivilege.map((forResPrivilege) => {
        const dataResPrivilege = {
          privilegeId: forResPrivilege.privilege_id,
          privilegeName: forResPrivilege.privilege_name,
          privilegeDesc: forResPrivilege.privilege_description,
        };
        return dataResPrivilege;
      });
      this.privilege = ret;
    });
  }

  getModule() {
    this.moduleServ.get().pipe(takeUntil(this.subs)).subscribe(resModule => {
      this.module = resModule.map((forResModule) => {
        const y = {
          moduleId : forResModule.module_id,
          moduleName :  forResModule.module_name,
        };
        return y;
      });
    });
  }

  filterByPrivilege(event) {

  }

  filterByModule(event) {

  }

  onUpdate(event) {
    const data = {
      createPermision : event.newData.createPermision,
      readPermision : event.newData.readPermision,
      deletePermision : event.newData.deletePermision,
    };
    event.confirm.resolve(event.newData);
    this.userRoleServ.update(data).pipe(takeUntil(this.subs)).subscribe(() => {
      const title = 'User role';
      const content = 'Data has been update';
      this.notifServ.showSuccessTypeToast(title, content);
    }, err => {
      const title = 'User role';
      const content = 'Error';
      this.notifServ.showInfoTypeToast(title, content);
    });
  }

}
