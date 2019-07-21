import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { SeasonService } from '../../../services/season/season.service';
import { SeasonTypeService } from '../../../services/season-type/season-type.service';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';

@Component({
  selector: 'ngx-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss'],
})
export class SeasonComponent implements OnInit, OnDestroy {
  season: LocalDataSource;
  private subs: Subject<void> = new Subject();
  settings = {
    actions: false,
    columns: {
      seasonName: {
        title: 'Name',
        type: 'string',
      },
      seasonTypeName: {
        title: 'Type',
        type: 'string',
      },
      seasonStatus: {
        title: 'Status',
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
    public seasonServ: SeasonService,
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
    this.seasonServ.get().pipe(takeUntil(this.subs)).subscribe(season => {
      this.seasonTypeServ.get().pipe(takeUntil(this.subs)).subscribe(seasonType2 => {
        console.log('seasonType2', seasonType2);
        const dataSeasonTypeId = season.map((y) => {
          const xyz = seasonType2.filter((z) => {
            return z.season_type_id === y.season_type_id;
          });
          const sdf =  {
            seasonCreatedAt: y.created_at,
            seasonCreatedBy: y.created_by,
            seasonEndDate: y.end_date,
            seasonFromDate: y.from_date,
            seasonDesc: y.season_description,
            seasonId: y.season_id,
            seasonName: y.season_name,
            seasonStatus: y.season_status,
            seasonTypeId: y.season_type_id,
            seasonTypeDesc: xyz[0].season_type_description,
            seasonTypeName: xyz[0].season_type_name,
            seasonStartDate: y.start_date,
            seasonToDate: y.to_date,
            seasonupdateAt: y.updated_at,
            seasonUpdateBy: y.updated_by,
            detail: {
              seasonId: y.season_id,
              seasonStatus: y.season_status,
            },
          };
          return sdf;
        });
        this.season = new LocalDataSource (dataSeasonTypeId);
        console.log('dataSeasonTypeId', dataSeasonTypeId);
      });
    });
  }

  toFormAdd() {
    this.router.navigate(['/pages/add-season']);
  }

}
