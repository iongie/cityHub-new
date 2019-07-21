import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SeasonTypeService } from '../../../../../services/season-type/season-type.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  seasonType = {
    seasonTypeName: '',
    seasonTypeDesc: '',
  };
  private subs: Subject<void> = new Subject();
  constructor(
    public router: Router,
    private seasonTypeService: SeasonTypeService,
    private notifServ: NotificationService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  addSeasonType() {
    console.log(this.seasonType);
    const data = {
      seasonTypeName: this.seasonType.seasonTypeName,
      seasonTypeDescription: this.seasonType.seasonTypeDesc,
    };
    this.seasonTypeService.add(data).pipe(takeUntil(this.subs)).subscribe(() => {
      const title = 'Season type';
      const content = 'Data has been Save';
      this.notifServ.showSuccessTypeToast(title, content);
      this.router.navigate(['pages/season-type']);
    }, err => {
      const title = 'User';
      const content = 'Error Data';
      this.notifServ.showInfoTypeToast(title, content);
    });
  }

}
