import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ECommerceComponent} from './e-commerce/e-commerce.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';

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
      path: 'change-password',
      loadChildren: './main/change-password/change-password.module#ChangePasswordModule',
    },
    {
      path: 'extra-charge-category',
      loadChildren: './main/extra-charge-category/extra-charge-category.module#ExtraChargeCategoryModule',
    },
    {
      path: 'add-extra-charge-category',
      loadChildren: './main/extra-charge-category/conf/add/add.module#AddModule',
    },
    {
      path: 'view-extra-charge-category',
      children: [{
        path: ':id',
        loadChildren: './main/extra-charge-category/conf/detail/detail.module#DetailModule',
      }, ],
    },
    {
      path: 'extra-charge',
      loadChildren: './main/extra-charge/extra-charge.module#ExtraChargeModule',
    },
    {
      path: 'add-extra-charge',
      loadChildren: './main/extra-charge/conf/add/add.module#AddModule',
    },
    {
      path: 'view-extra-charge',
      children: [{
        path: ':id',
        loadChildren: './main/extra-charge/conf/detail/detail.module#DetailModule',
      }, ],
    },
    {
      path: 'floor',
      loadChildren: './main/floor/floor.module#FloorModule',
    },
    {
      path: 'add-floor',
      loadChildren: './main/floor/conf/add/add.module#AddModule',
    },
    {
      path: 'view-floor',
      children: [{
        path: ':id',
        loadChildren: './main/floor/conf/detail/detail.module#DetailModule',
      }, ],
    },
    {
      path: 'room-operation',
      loadChildren: './main/room-operation/room-operation.module#RoomOperationModule',
    },
    {
      path: 'add-room-operation',
      loadChildren: './main/room-operation/conf/add/add.module#AddModule',
    },
    {
      path: 'view-room-operation',
      children: [{
        path: ':id',
        loadChildren: './main/room-operation/conf/detail/detail.module#DetailModule',
      }, ],
    },
    {
      path: 'room-tariff',
      loadChildren: './main/room-tariff/room-tariff.module#RoomTariffModule',
    },
    {
      path: 'update-room-tariff',
      loadChildren: './main/room-tariff/update/update.module#UpdateModule',
    },
    {
      path: 'room-type',
      loadChildren: './main/room-type/room-type.module#RoomTypeModule',
    },
    {
      path: 'add-room-type',
      loadChildren: './main/room-type/conf/add/add.module#AddModule',
    },
    {
      path: 'view-room-type',
      children: [{
        path: ':id',
        loadChildren: './main/room-type/conf/detail/detail.module#DetailModule',
      }, ],
    },
    {
      path: 'season',
      loadChildren: './main/season/season.module#SeasonModule',
    },
    {
      path: 'add-season',
      loadChildren: './main/season/conf/add/add.module#AddModule',
    },
    {
      path: 'view-season',
      children: [{
        path: ':id',
        loadChildren: './main/season/conf/detail/detail.module#DetailModule',
      }, ],
    },
    {
      path: 'season-type',
      loadChildren: './main/season-type/season-type.module#SeasonTypeModule',
    },
    {
      path: 'add-season-type',
      loadChildren: './main/season-type/conf/add/add.module#AddModule',
    },
    {
      path: 'view-season-type',
      children: [{
        path: ':id',
        loadChildren: './main/season-type/conf/detail/detail.module#DetailModule',
      }, ],
    },
    {
      path: 'tax',
      loadChildren: './main/tax/tax.module#TaxModule',
    },
    {
      path: 'add-tax',
      loadChildren: './main/tax/conf/add/add.module#AddModule',
    },
    {
      path: 'view-tax',
      children: [{
        path: ':id',
        loadChildren: './main/tax/conf/detail/detail.module#DetailModule',
      }, ],
    },
    {
      path: 'payment-type',
      loadChildren: './main/payment-type/payment-type.module#PaymentTypeModule',
    },
    {
      path: 'add-payment-type',
      loadChildren: './main/payment-type/conf/add/add.module#AddModule',
    },
    {
      path: 'view-payment-type',
      children: [{
        path: ':id',
        loadChildren: './main/payment-type/conf/detail/detail.module#DetailModule',
      }, ],
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
      children: [{
        path: ':id',
        loadChildren: './main/booking-rev3/booking-detail/booking-detail.module#BookingDetailModule',
      }, ],
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
      }, ],
    },
    {
      path: 'miscellaneous-sales',
      loadChildren: './main/miscellaneous-sales/miscellaneous-sales.module#MiscellaneousSalesModule',
    },
    {
      path: 'user',
      loadChildren: './main/user/user.module#UserModule',
    },
    {
      path: 'add-user',
      loadChildren: './main/user/conf/add/add.module#AddModule',
    },
    {
      path: 'view-user',
      children: [{
        path: ':id',
        loadChildren: './main/user/conf/detail/detail.module#DetailModule',
      }, ],
    },
    {
      path: 'user-role',
      loadChildren: './main/role/role.module#RoleModule',
    },
    {
      path: 'privilege',
      loadChildren: './main/privilege/privilege.module#PrivilegeModule',
    },
    {
      path: 'property-information',
      loadChildren: './main/property-information/property-information.module#PropertyInformationModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    }
  ],
}];

@NgModule
  ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class PagesRoutingModule {}
