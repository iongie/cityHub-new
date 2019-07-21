import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  private subs = new Subject();
  login = {
    username: '',
    password: '',
  };
  constructor(
    public authServ: AuthService,
    public notifServ: NotificationService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  onSubmit() {
    this.authServ.login(this.login).pipe(takeUntil(this.subs)).subscribe(res => {
      const data = res.token;
      if (res.token) {
        localStorage.setItem('p_l1oxt', data);
        this.router.navigate(['pages/dashboard']);
      }else if (!res.Token) {
        localStorage.clear();
        const title = 'Authentication';
        const content = res.Error;
        this.notifServ.showInfoTypeToast(title, content);
      }
    }, err => {
      const title = 'Authentication';
      const content = 'Incorrect username and password';
      this.notifServ.showInfoTypeToast(title, content);
    });
  }

}
