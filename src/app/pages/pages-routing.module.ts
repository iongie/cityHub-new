import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ECommerceComponent} from './e-commerce/e-commerce.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import { UserRoleGuardGuard } from '../services/user-role-guard/user-role-guard.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    // {
    // path: 'dashboard',
    // component: DashboardComponent,
    // },
    {
      path: 'modal-overlays',
      loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
    },
    {
      path: 'ui-features',
      loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
    },
    {
      path: 'dashboard',
      loadChildren: './main/dashboard/dashboard.module#DashboardModule',
    },
    {
      path: 'source',
      loadChildren: './main/source/source.module#SourceModule',
    },
    {
      path: 'tax',
      loadChildren: './main/tax/tax.module#TaxModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'extra-charge-category',
      loadChildren: './main/extra-charge-category/extra-charge-category.module#ExtraChargeCategoryModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'add-extra-charge-category',
      loadChildren: './main/extra-charge-category/conf/add/add.module#AddModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'view-extra-charge-category',
      children: [{
        path: ':id',
        loadChildren: './main/extra-charge-category/conf/detail/detail.module#DetailModule',
        canActivateChild: [UserRoleGuardGuard],
      } ],
    },
    {
      path: 'extra-charge',
      loadChildren: './main/extra-charge/extra-charge.module#ExtraChargeModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'add-extra-charge',
      loadChildren: './main/extra-charge/conf/add/add.module#AddModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'view-extra-charge',
      children: [{
        path: ':id',
        loadChildren: './main/extra-charge/conf/detail/detail.module#DetailModule',
        canActivateChild: [UserRoleGuardGuard],
      } ],
    },
    {
      path: 'floor',
      loadChildren: './main/floor/floor.module#FloorModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'add-floor',
      loadChildren: './main/floor/conf/add/add.module#AddModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'view-floor',
      children: [{
        path: ':id',
        loadChildren: './main/floor/conf/detail/detail.module#DetailModule',
        canActivateChild: [UserRoleGuardGuard],
      } ],
    },
    {
      path: 'room-operation',
      loadChildren: './main/room-operation/room-operation.module#RoomOperationModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'add-room-operation',
      loadChildren: './main/room-operation/conf/add/add.module#AddModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'view-room-operation',
      children: [{
        path: ':id',
        loadChildren: './main/room-operation/conf/detail/detail.module#DetailModule',
        canActivateChild: [UserRoleGuardGuard],
      }],
    },
    {
      path: 'room-tariff',
      loadChildren: './main/room-tariff/room-tariff.module#RoomTariffModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'update-room-tariff',
      loadChildren: './main/room-tariff/update/update.module#UpdateModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'room-type',
      loadChildren: './main/room-type/room-type.module#RoomTypeModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'add-room-type',
      loadChildren: './main/room-type/conf/add/add.module#AddModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'view-room-type',
      children: [{
        path: ':id',
        loadChildren: './main/room-type/conf/detail/detail.module#DetailModule',
        canActivateChild: [UserRoleGuardGuard],
      } ],
    },
    {
      path: 'season',
      loadChildren: './main/season/season.module#SeasonModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'add-season',
      loadChildren: './main/season/conf/add/add.module#AddModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'view-season',
      children: [{
        path: ':id',
        loadChildren: './main/season/conf/detail/detail.module#DetailModule',
        canActivateChild: [UserRoleGuardGuard],
      } ],
    },
    {
      path: 'season-type',
      loadChildren: './main/season-type/season-type.module#SeasonTypeModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'add-season-type',
      loadChildren: './main/season-type/conf/add/add.module#AddModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'view-season-type',
      children: [{
        path: ':id',
        loadChildren: './main/season-type/conf/detail/detail.module#DetailModule',
        canActivateChild: [UserRoleGuardGuard],
      } ],
    },
    {
      path: 'tax',
      loadChildren: './main/tax/tax.module#TaxModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'add-tax',
      loadChildren: './main/tax/conf/add/add.module#AddModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'view-tax',
      children: [{
        path: ':id',
        loadChildren: './main/tax/conf/detail/detail.module#DetailModule',
        canActivateChild: [UserRoleGuardGuard],
      } ],
    },
    {
      path: 'payment-type',
      loadChildren: './main/payment-type/payment-type.module#PaymentTypeModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'add-payment-type',
      loadChildren: './main/payment-type/conf/add/add.module#AddModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'view-payment-type',
      children: [{
        path: ':id',
        loadChildren: './main/payment-type/conf/detail/detail.module#DetailModule',
        canActivateChild: [UserRoleGuardGuard],
      } ],
    },
    {
      path: 'add-booking',
      loadChildren: './main/booking-rev3/booking-add/booking-add.module#BookingAddModule',
    },
    {
      path: 'booking',
      loadChildren: './main/booking-rev3/booking-list/booking-list.module#BookingListModule',
    },
    {
      path: 'booking-detail',
      children: [
        {
          path: ':id',
          loadChildren: './main/booking-rev3/booking-detail/booking-detail.module#BookingDetailModule',
        },
        {
          path: ':number',
          children: [
            {
              path: ':id',
              loadChildren: './main/booking-rev3/booking-room/booking-room.module#BookingRoomModule',
            },
          ],
        },
        {
          path: 'add-stay',
          children: [
            {
              path: ':number',
              children: [
                {
                  path: ':id',
                  loadChildren: './main/booking-rev3/booking-room/add-stay/add-stay.module#AddStayModule',
                },
              ],
            },
          ],
        },
        {
          path: 'less-stay',
          children: [
            {
              path: ':number',
              children: [
                {
                  path: ':id',
                  loadChildren: './main/booking-rev3/booking-room/less-stay/less-stay.module#LessStayModule',
                },
              ],
            },
          ],
        },
        {
          path: 'move-room',
          children: [
            {
              path: ':number',
              children: [
                {
                  path: ':id',
                  loadChildren: './main/booking-rev3/booking-room/move-room/move-room.module#MoveRoomModule',
                },
              ],
            },
          ],
        },
        {
          path: 'nota',
          children: [
            {
              path: ':number',
              children: [
                {
                  path: ':id',
                  loadChildren: './main/booking-rev3/booking-room/nota/nota.module#NotaModule',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: 'extend-room',
      children: [
        {
          path: ':id',
          loadChildren: './main/booking-rev3/booking-detail/extend-room/extend-room.module#ExtendRoomModule',
        },
      ],
    },
    {
      path: 'booking-management',
      loadChildren: './main/booking-rev3/booking-list/booking-list.module#BookingListModule',
    },
    {
      path: 'guest',
      loadChildren: './main/guest/guest.module#GuestModule',
    },
    {
      path: 'add-guest',
      loadChildren: './main/guest/conf/add/add.module#AddModule',
    },
    {
      path: 'view-guest',
      children: [{
        path: ':id',
        loadChildren: './main/guest/conf/detail/detail.module#DetailModule',
      } ],
    },
    {
      path: 'miscellaneous-sales',
      loadChildren: './main/miscellaneous-sales/miscellaneous-sales.module#MiscellaneousSalesModule',
    },
    {
      path: 'add-miscellaneous-sales',
      loadChildren: './main/miscellaneous-sales/add-miscellaneous-sales/add-miscellaneous-sales.module#AddMiscellaneousSalesModule',
    },
    {
      path: 'extend-miscellaneous-sales',
      children: [
        {
          path: ':id',
          loadChildren: './main/miscellaneous-sales/miscellaneous-sales-extend/miscellaneous-sales-extend.module#MiscellaneousSalesExtendModule',
        },
      ],
    },
    {
      path: 'nota-miscellaneous-sales',
      children: [
        {
          path: ':id',
          loadChildren: './main/miscellaneous-sales/miscellaneous-sales-nota/miscellaneous-sales-nota.module#MiscellaneousSalesNotaModule',
        },
      ],
    },
    {
      path: 'detail-miscellaneous-sales',
      children: [
        {
          path: ':id',
          loadChildren: './main/miscellaneous-sales/miscellaneous-sales-detail/miscellaneous-sales-detail.module#MiscellaneousSalesDetailModule',
        },
      ],
    },
    {
      path: 'detail-miscellaneous-sales-extra-charge',
      children: [
        {
          path: ':id',
          // tslint:disable-next-line: max-line-length
          loadChildren: './main/miscellaneous-sales/miscellaneous-sales-detail/miscellaneous-sales-detail-extra-charge/miscellaneous-sales-detail-extra-charge.module#MiscellaneousSalesDetailExtraChargeModule',
        },
      ],
    },
    {
      path: 'discount-management',
      loadChildren: './main/discount/discount.module#DiscountModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'add-discount',
      loadChildren: './main/discount/add/add.module#AddModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'view-discount',
      children: [{
        path: ':id',
        loadChildren: './main/discount/detail/detail.module#DetailModule',
        canActivateChild: [UserRoleGuardGuard],
      } ],
    },
    {
      path: 'user',
      loadChildren: './main/user/user.module#UserModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'add-user',
      loadChildren: './main/user/conf/add/add.module#AddModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'view-user',
      children: [{
        path: ':id',
        loadChildren: './main/user/conf/detail/detail.module#DetailModule',
        canActivateChild: [UserRoleGuardGuard],
      } ],
    },
    {
      path: 'user-role',
      loadChildren: './main/role/role.module#RoleModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'privilege',
      loadChildren: './main/privilege/privilege.module#PrivilegeModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'property-information',
      loadChildren: './main/property-information/property-information.module#PropertyInformationModule',
      canActivateChild: [UserRoleGuardGuard],
    },
    {
      path: 'night-audit',
      loadChildren: './main/night-audit/night-audit.module#NightAuditModule',
    },
    {
      path: 'arrival-list-report',
      loadChildren: './main/report-arrival-list/report-arrival-list.module#ReportArrivalListModule',
    },
    {
      path: 'daily-report',
      loadChildren: './main/report-daily/report-daily.module#ReportDailyModule',
    },
    {
      path: 'number-of-night-report',
      loadChildren: './main/report-number-of-night/report-number-of-night.module#ReportNumberOfNightModule',
    },
    {
      path: 'user-shift-report',
      loadChildren: './main/report-user-shift/report-user-shift.module#ReportUserShiftModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule
  ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class PagesRoutingModule {}
