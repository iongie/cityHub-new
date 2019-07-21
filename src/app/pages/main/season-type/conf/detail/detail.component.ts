import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SeasonTypeService } from '../../../../../services/season-type/season-type.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  seasonType: any;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private seasonTypeService: SeasonTypeService,
    private notifServ: NotificationService,
  ) { }

  ngOnInit() {
    this.viewById();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  viewById() {
    this.activeRoute.params.subscribe(params => {
      const seasonTypeId = {
        id: params.id,
      };
      this.seasonTypeService.getById(seasonTypeId).pipe(takeUntil(this.subs)).subscribe(resById => {
        const data = resById.map((y) => {
          const xyz = {
            seasonTypeDesc: y.season_type_description,
            seasonTypeId: y.season_type_id,
            seasonTypeName: y.season_type_name,
          };
          return xyz;
        });
        this.seasonType = data;
        console.log('this.seasonType', this.seasonType);
      });
    });
  }

  updateSeasonType() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        userId: params.id,
        seasonTypeDescription: this.seasonType[0].seasonTypeDesc,
        seasonTypeId: this.seasonType[0].seasonTypeId,
        seasonTypeName: this.seasonType[0].seasonTypeName,
      };
      this.seasonTypeService.update(data).pipe(takeUntil(this.subs)).subscribe(() => {
        const title = 'Season type';
        const content = 'Data has been updated';
        this.notifServ.showSuccessTypeToast(title, content);
      }, err => {
        const title = 'User';
        const content = 'Error Data';
        this.notifServ.showInfoTypeToast(title, content);
      });
    });
  }

}
