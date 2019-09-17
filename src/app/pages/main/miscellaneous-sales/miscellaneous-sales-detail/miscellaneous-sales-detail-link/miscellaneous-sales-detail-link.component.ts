import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';
import { MiscellaneousSalesService } from '../../../../../services/miscellaneous-sales/miscellaneous-sales.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { takeUntil, filter, map } from 'rxjs/operators';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'ngx-miscellaneous-sales-detail-link',
  templateUrl: './miscellaneous-sales-detail-link.component.html',
  styleUrls: ['./miscellaneous-sales-detail-link.component.scss'],
})
export class MiscellaneousSalesDetailLinkComponent implements OnInit, OnDestroy {
  renderValue: any;

  @Input() value: any;
  @Input() rowData: any;
  private subs: Subject<void> = new Subject();
  items = [
    // { title: 'Detail',
    //   icon: 'fa fa-search-plus',
    //   data: {
    //     id: '',
    //     number: '',
    //   },
    // },
    { title: 'Cancel Miscellaneous Sales',
      icon: 'fa fa-times',
    },
  ];
  data: any;
  userCityHub: any;
  constructor(
    private nbMenuService: NbMenuService,
    private router: Router,
    public miscellaneousSalesServ: MiscellaneousSalesService,
    private notifServ: NotificationService,
    public authServ: AuthService,
  ) { }

  ngOnInit() {
    this.renderValue  = this.value.id;
    this.action();
    this.viewOption();
    this.detailAccount();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  detailAccount() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data)
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      this.userCityHub = {
        name : res[0].full_name,
      };
      console.log(this.userCityHub);
    });
  }

  viewOption() {
    const dataMap = this.items.map((y) => {
      const xyz = {
        title: y.title,
        icon: y.icon,
        data: {
          id: this.value.id,
          number: this.value.number,
        },
      };
      return xyz;
    });
    this.data = dataMap;
  }

  action() {
    this.nbMenuService.onItemClick()
    .pipe(
      takeUntil(this.subs),
      filter(({ tag }) => tag === 'miscSalesDetail'),
      map(({item}) => item),
    )
    .subscribe(item => {
      // if (item.data.id === this.renderValue && item.title === 'Detail') {
      //   this.router.navigate(['pages/detail-miscellaneous-sales-extra-charge/' + this.renderValue]);
      // }

      if (item.data.id === this.renderValue && item.title === 'Cancel Miscellaneous Sales') {
        console.log('this.renderValue', this.renderValue);
        const data = {
          miscSalesDetailId: this.renderValue,
          removedBy: this.userCityHub.name,
        };
        this.miscellaneousSalesServ.cancelMiscByDetail(data)
        .pipe(takeUntil(this.subs))
        .subscribe(() => {
          const title = 'Cancel Miscellaneous Sales number:' + item.data.number;
          const content = 'Successfully';
          setTimeout(() => {
            this.notifServ.showSuccessTypeToast(title, content);
          });
        });
      }
    });
  }


}
