import { Component, Input, OnInit, Inject, OnDestroy } from '@angular/core';

import { NbMenuService, NbSidebarService, NB_WINDOW } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserRoleService } from '../../../services/user-role/user-role.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  userCityHub: any[];
  forRole: any;
  private subs = new Subject();
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserData,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private authServ: AuthService,
              private userRoleServ: UserRoleService,
              private router: Router,
              @Inject(NB_WINDOW) private window,
              private nbMenuService: NbMenuService) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
    this.detailAccount();
    this.action();
    this.detailUserRole();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  detailAccount() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data).pipe(takeUntil(this.subs)).subscribe(res => {
      this.userCityHub = [{
        name : res[0].full_name,
        email: res[0].email,
        privilageId : res[0].privilege_id,
        privilageName : res[0].privilege_name,
        userId: res[0].user_id,
        username: res[0].username,
      }];

      this.forRole = {
        name : res[0].full_name,
        email: res[0].email,
        privilageId : res[0].privilege_id,
        privilageName : res[0].privilege_name,
        userId: res[0].user_id,
        username: res[0].username,
      };

      console.log(this.forRole);
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
        console.log(resUserRole);
      });
    });
  }

  logout() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.logout(data).pipe(takeUntil(this.subs)).subscribe(() => {
        localStorage.removeItem('p_l1oxt');
        this.router.navigate(['auth/login']);
    });
  }

  action() {
    this.nbMenuService.onItemClick().pipe(
      takeUntil(this.subs),
      filter(({ tag }) => tag === 'my-context-menu'),
      map(({ item: { title } }) => title),
    ).subscribe(title => {
      if (title === 'Log out') {
        this.logout();
      }else if (title === 'Profile') {
        this.router.navigate(['pages/profile']);
      }
    });
  }
}
