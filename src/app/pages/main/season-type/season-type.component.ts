import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { SeasonTypeService } from '../../../services/season-type/season-type.service';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';

@Component({
  selector: 'ngx-season-type',
  templateUrl: './season-type.component.html',
  styleUrls: ['./season-type.component.scss'],
})
export class SeasonTypeComponent implements OnInit, OnDestroy {
  seasonType: LocalDataSource;
  private subs: Subject<void> = new Subject();
  settings = {
    actions: false,
    columns: {
      seasonTypeName: {
        title: 'Name',
        type: 'string',
      },
      seasonTypeDesc: {
        title: 'Description',
        type: 'string',
      },
      detail: {
        title: 'Detail',
        type: 'custom',
        renderComponent: LinkDetailComponent,
        filter: false,
      },
    },
  };
  constructor(
    public seasonTypeServ: SeasonTypeService,
    public notifServ: NotificationService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.getSeasonType();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getSeasonType() {
    this.seasonTypeServ.get().pipe(takeUntil(this.subs)).subscribe(seasonType => {
      const data = seasonType.map((y) => {
        const abc = {
          seasonTypeId: y.season_type_id,
          seasonTypeName: y.season_type_name,
          seasonTypeDesc: y.season_type_description,
          detail: y.season_type_id,
        };
        return abc;
      });
      console.log(data);
      this.seasonType = new LocalDataSource (data);
    });
  }

  toFormAdd() {
    this.router.navigate(['/pages/add-season-type']);
  }

}
