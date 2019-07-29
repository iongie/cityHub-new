import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { RoomTypeService } from '../../../services/room-type/room-type.service';
import { FloorService } from '../../../services/floor/floor.service';
import { RoomOperationService } from '../../../services/room-operation/room-operation.service';
import { RoomStatusService } from '../../../services/room-status/room-status.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';
import { RoomTariffService } from '../../../services/room-tariff/room-tariff.service';
import { SeasonService } from '../../../services/season/season.service';
import { TaxService } from '../../../services/tax/tax.service';
import { takeUntil, map, filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-room-tariff',
  templateUrl: './room-tariff.component.html',
  styleUrls: ['./room-tariff.component.scss'],
})
export class RoomTariffComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  roomTariff: LocalDataSource;
  roomType: any;
  season: any;
  eventSeason: any;
  eventRoomType: any;
  filterRoomTariff = {
    roomTypeId: '',
    seasonId: '',
  };
  forRole: any;
  show: any;
  weekdayTariff = 'Weekdays Rate';
  weekEndTariff = 'Weekends Rate';
  tes: any;
  settingsWeekdays = {
    actions: false,
    columns: {
      roomTypeName: {
        title: 'Room Type',
        type: 'string',
      },
      baseRate: {
        title: 'Base Rate',
        type: 'html',
        valuePrepareFunction: (value) => {
          return value = Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            currencyDisplay: 'code' }).format(value);
        },
      },
      increaseRate: {
        title: 'Increase Rate',
        type: 'html',
        valuePrepareFunction: (value) => {
          return value = Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            currencyDisplay: 'code' }).format(value);
        },
      },
      weekdayTariff: {
        title: 'Tariff',
        type: 'html',
        valuePrepareFunction: (value) => {
          return value = Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            currencyDisplay: 'code' }).format(value);
        },
      },
      seasonName: {
        title: 'Season',
        type: 'string',
      },
      baseAdult: {
        title: 'Base Adult',
        type: 'string',
      },
      baseChild: {
        title: 'Base Child',
        type: 'string',
      },
      maxAdult: {
        title: 'Max Adult',
        type: 'string',
      },
      maxChild: {
        title: 'Max Child',
        type: 'string',
      },
    },
  };

  settingsWeekends = {
    actions: false,
    columns: {
      roomTypeName: {
        title: 'Room Type',
        type: 'string',
      },
      baseRate: {
        title: 'Base Rate',
        type: 'html',
        valuePrepareFunction: (value) => {
          return value = Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            currencyDisplay: 'code' }).format(value);
        },
      },
      increaseRate: {
        title: 'Increase Rate',
        type: 'html',
        valuePrepareFunction: (value) => {
          return value = Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            currencyDisplay: 'code' }).format(value);
        },
      },
      weekendTariff: {
        title: 'Tariff',
        type: 'html',
        valuePrepareFunction: (value) => {
          return value = Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            currencyDisplay: 'code' }).format(value);
        },
      },
      seasonName: {
        title: 'Season',
        type: 'string',
      },
      baseAdult: {
        title: 'Base Adult',
        type: 'string',
      },
      baseChild: {
        title: 'Base Child',
        type: 'string',
      },
      maxAdult: {
        title: 'Max Adult',
        type: 'string',
      },
      maxChild: {
        title: 'Max Child',
        type: 'string',
      },
    },
  };
  constructor(
    public roomTypeServ: RoomTypeService,
    public floorServ: FloorService,
    public roomTariffServ: RoomTariffService,
    public seasonServ: SeasonService,
    public taxServ: TaxService,
    public roomOperationServ: RoomOperationService,
    public roomStatus: RoomStatusService,
    public notifServ: NotificationService,
    public router: Router,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
  ) { }

  ngOnInit() {
    this.getRoomTariff();
    this.refreshRoom();
    this.getRoomType();
    this.filterRoomTariff.roomTypeId = '';
  }

  refreshRoom() {
    this.roomTariffServ.refresh.subscribe(() => {
      this.getRoomTariff();
    });
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getRoomType() {
    this.roomTypeServ.get().pipe(takeUntil(this.subs)).subscribe(resRoomType => {
      console.log(resRoomType);
    });
  }

  getRoomTariff() {
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

        if (filter[0].create_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].create_permision === 'not allowed') {
          this.show = false;
        }else if (filter[0].read_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].read_permision === 'not allowed') {
          this.show = false;
        }else if (filter[0].update_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].update_permision === 'not allowed') {
          this.show = false;
        }else if (filter[0].delete_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].delete_permision === 'not allowed') {
          this.show = false;
        }

        this.roomTariffServ.get().pipe(takeUntil(this.subs)).subscribe(resRoomTariff => {
          const resCurrentTariff = resRoomTariff['current_tariff'];
          const resSeason = resRoomTariff['season'];
          const resTax = resRoomTariff['tax'];

          const currentTariff = resCurrentTariff.map((forResCurrentTarrif) => {
            const a = {
              baseAdult: forResCurrentTarrif.base_adult,
              baseChild: forResCurrentTarrif.base_child,
              baseRate: forResCurrentTarrif.base_rate,
              createdAt: forResCurrentTarrif.created_at,
              createdBy: forResCurrentTarrif.created_by,
              endDate: forResCurrentTarrif.end_date,
              fromDate: forResCurrentTarrif.from_date,
              increaseRate: forResCurrentTarrif.increase_rate,
              maxAdult: forResCurrentTarrif.max_adult,
              maxChild: forResCurrentTarrif.max_child,
              roomDescription: forResCurrentTarrif.room_description,
              roomTariffId: forResCurrentTarrif.room_tariff_id,
              roomTypeId: forResCurrentTarrif.room_type_id,
              roomTypeName: forResCurrentTarrif.room_type_name,
              seasonDescription: forResCurrentTarrif.season_description,
              seasonId: forResCurrentTarrif.season_id,
              seasonName: forResCurrentTarrif.season_name,
              seasonStatus: forResCurrentTarrif.season_status,
              seasonTypeId: forResCurrentTarrif.season_type_id,
              startDate: forResCurrentTarrif.start_date,
              taxId: forResCurrentTarrif.tax_id,
              taxName: forResCurrentTarrif.tax_name,
              taxRate: forResCurrentTarrif.tax_rate,
              taxStatus: forResCurrentTarrif.tax_status,
              toDate: forResCurrentTarrif.to_date,
              totalRoom: forResCurrentTarrif.total_room,
              updatedAt: forResCurrentTarrif.updated_at,
              updatedBy: forResCurrentTarrif.updated_by,
              weekdayTariff: forResCurrentTarrif. weekday_tariff,
              weekendTariff: forResCurrentTarrif.weekend_tariff,
            };
            return a;
          });

          const season = resSeason.map((forResSeason) => {
            const b = {
              seasonDescription: forResSeason.season_description,
              seasonId: forResSeason.season_id,
              seasonName: forResSeason.season_name,
              seasonStatus: forResSeason.season_status,
              seasonTypeId: forResSeason.season_type_id,
            };
            return b;
          });

          const tax = resTax.map((forResTax) => {
            const b = {
              taxId: forResTax.tax_id,
              taxName: forResTax.tax_name,
              taxRate: forResTax.tax_rate,
            };
            return b;
          });
          const data = currentTariff;
          this.roomType = currentTariff;
          this.season = season;
          this.roomTariff = new LocalDataSource (data);
          console.log('current_tariff', currentTariff);
          console.log('season', season);
          console.log('tax', tax);
          console.log('data', data);
        });
      });
    });
  }

  filterByRoomType(event) {
    if (event === '') {
      console.log('null');
    } else {
      this.eventRoomType = event;
      console.log(event);
    }
    this.roomTariffServ.get().pipe(takeUntil(this.subs)).subscribe(resRoomTariff => {
      const resCurrentTariff = resRoomTariff['current_tariff'].filter((filterResCurrentTarrif) => {
        if (event === '') {
          return filterResCurrentTarrif.room_type_id ;
        } else {
          return filterResCurrentTarrif.room_type_id === JSON.parse(event);
        }
      });
      const currentTariff = resCurrentTariff.map((forResCurrentTarrif) => {
        const a = {
          baseAdult: forResCurrentTarrif.base_adult,
          baseChild: forResCurrentTarrif.base_child,
          baseRate: forResCurrentTarrif.base_rate,
          createdAt: forResCurrentTarrif.created_at,
          createdBy: forResCurrentTarrif.created_by,
          endDate: forResCurrentTarrif.end_date,
          fromDate: forResCurrentTarrif.from_date,
          increaseRate: forResCurrentTarrif.increase_rate,
          maxAdult: forResCurrentTarrif.max_adult,
          maxChild: forResCurrentTarrif.max_child,
          roomDescription: forResCurrentTarrif.room_description,
          roomTariffId: forResCurrentTarrif.room_tariff_id,
          roomTypeId: forResCurrentTarrif.room_type_id,
          roomTypeName: forResCurrentTarrif.room_type_name,
          seasonDescription: forResCurrentTarrif.season_description,
          seasonId: forResCurrentTarrif.season_id,
          seasonName: forResCurrentTarrif.season_name,
          seasonStatus: forResCurrentTarrif.season_status,
          seasonTypeId: forResCurrentTarrif.season_type_id,
          startDate: forResCurrentTarrif.start_date,
          taxId: forResCurrentTarrif.tax_id,
          taxName: forResCurrentTarrif.tax_name,
          taxRate: forResCurrentTarrif.tax_rate,
          taxStatus: forResCurrentTarrif.tax_status,
          toDate: forResCurrentTarrif.to_date,
          totalRoom: forResCurrentTarrif.total_room,
          updatedAt: forResCurrentTarrif.updated_at,
          updatedBy: forResCurrentTarrif.updated_by,
          weekdayTariff: forResCurrentTarrif. weekday_tariff,
          weekendTariff: forResCurrentTarrif.weekend_tariff,
        };
        return a;
      });
      const data = currentTariff;
      this.roomTariff = new LocalDataSource (data);
    });
  }

  filterBySeason(event) {
    if (event === '') {
      console.log('null');
    } else {
      this.eventSeason = event;
      console.log(this.eventRoomType);
    }
    this.roomTariffServ.get().pipe(takeUntil(this.subs)).subscribe(resRoomTariff => {
      const resCurrentTariff = resRoomTariff['current_tariff'].filter((filterResCurrentTarrif) => {
        if (event === '') {
          return filterResCurrentTarrif.season_id ;
        } else {
          return filterResCurrentTarrif.season_id === JSON.parse(event);
        }
      });
      const currentTariff = resCurrentTariff.map((forResCurrentTarrif) => {
        const a = {
          baseAdult: forResCurrentTarrif.base_adult,
          baseChild: forResCurrentTarrif.base_child,
          baseRate: forResCurrentTarrif.base_rate,
          createdAt: forResCurrentTarrif.created_at,
          createdBy: forResCurrentTarrif.created_by,
          endDate: forResCurrentTarrif.end_date,
          fromDate: forResCurrentTarrif.from_date,
          increaseRate: forResCurrentTarrif.increase_rate,
          maxAdult: forResCurrentTarrif.max_adult,
          maxChild: forResCurrentTarrif.max_child,
          roomDescription: forResCurrentTarrif.room_description,
          roomTariffId: forResCurrentTarrif.room_tariff_id,
          roomTypeId: forResCurrentTarrif.room_type_id,
          roomTypeName: forResCurrentTarrif.room_type_name,
          seasonDescription: forResCurrentTarrif.season_description,
          seasonId: forResCurrentTarrif.season_id,
          seasonName: forResCurrentTarrif.season_name,
          seasonStatus: forResCurrentTarrif.season_status,
          seasonTypeId: forResCurrentTarrif.season_type_id,
          startDate: forResCurrentTarrif.start_date,
          taxId: forResCurrentTarrif.tax_id,
          taxName: forResCurrentTarrif.tax_name,
          taxRate: forResCurrentTarrif.tax_rate,
          taxStatus: forResCurrentTarrif.tax_status,
          toDate: forResCurrentTarrif.to_date,
          totalRoom: forResCurrentTarrif.total_room,
          updatedAt: forResCurrentTarrif.updated_at,
          updatedBy: forResCurrentTarrif.updated_by,
          weekdayTariff: forResCurrentTarrif. weekday_tariff,
          weekendTariff: forResCurrentTarrif.weekend_tariff,
        };
        return a;
      });
      const data = currentTariff;
      this.roomTariff = new LocalDataSource (data);
    });
  }
}
