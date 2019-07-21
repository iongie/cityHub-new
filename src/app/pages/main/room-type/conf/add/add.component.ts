import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RoomTypeService } from '../../../../../services/room-type/room-type.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  roomType = {
    roomTypeName: '',
    baseAdult: '',
    baseChild: '',
    maxAdult: '',
    maxChild: '',
    roomDesc: '',
    baseRate: '',
    increaseRate: '',
  };
  private subs: Subject<void> = new Subject();
  constructor(
    public router: Router,
    private roomTypeServ: RoomTypeService,
    private notifServ: NotificationService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  addRoomType() {
    this.roomTypeServ.add(this.roomType).pipe(takeUntil(this.subs)).subscribe(() => {
      const title = 'Room type';
      const content = 'Data has been save';
      this.notifServ.showSuccessTypeToast(title, content);
      this.router.navigate(['pages/room-type']);
    }, err => {
      const title = 'Room type';
      const content = 'Error';
      this.notifServ.showInfoTypeToast(title, content);
    });
  }

}
