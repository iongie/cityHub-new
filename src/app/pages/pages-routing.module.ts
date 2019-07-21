import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: ECommerceComponent,
  }, {
    path: 'iot-dashboard',
    component: DashboardComponent,
  }, {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'dashboard',
    loadChildren: './main/dashboard/dashboard.module#DashboardModule',
  }, {
    path: 'extra-charge-category',
    loadChildren: './main/extra-charge-category/extra-charge-category.module#ExtraChargeCategoryModule',
  }, {
    path: 'extra-charge',
    loadChildren: './main/extra-charge/extra-charge.module#ExtraChargeModule',
  }, {
    path: 'add-extra-charge',
    loadChildren: './main/extra-charge/conf/add/add.module#AddModule',
  }, {
    path: 'view-extra-charge',
    children: [
      {
        path: ':id',
        loadChildren: './main/extra-charge/conf/detail/detail.module#DetailModule',
      },
    ],
  }, {
    path: 'floor',
    loadChildren: './main/floor/floor.module#FloorModule',
  }, {
    path: 'add-floor',
    loadChildren: './main/floor/conf/add/add.module#AddModule',
  }, {
    path: 'view-floor',
    children: [
      {
        path: ':id',
        loadChildren: './main/floor/conf/detail/detail.module#DetailModule',
      },
    ],
  }, {
    path: 'room-operation',
    loadChildren: './main/room-operation/room-operation.module#RoomOperationModule',
  }, {
    path: 'add-room-operation',
    loadChildren: './main/room-operation/conf/add/add.module#AddModule',
  }, {
    path: 'view-room-operation',
    children: [
      {
        path: ':id',
        loadChildren: './main/room-operation/conf/detail/detail.module#DetailModule',
      },
    ],
  }, {
    path: 'room-tariff',
    loadChildren: './main/room-tariff/room-tariff.module#RoomTariffModule',
  }, {
    path: 'room-type',
    loadChildren: './main/room-type/room-type.module#RoomTypeModule',
  }, {
    path: 'add-room-type',
    loadChildren: './main/room-type/conf/add/add.module#AddModule',
  }, {
    path: 'view-room-type',
    children: [
      {
        path: ':id',
        loadChildren: './main/room-type/conf/detail/detail.module#DetailModule',
      },
    ],
  }, {
    path: 'season',
    loadChildren: './main/season/season.module#SeasonModule',
  }, {
    path: 'add-season',
    loadChildren: './main/season/conf/add/add.module#AddModule',
  }, {
    path: 'view-season',
    children: [
      {
        path: ':id',
        loadChildren: './main/season/conf/detail/detail.module#DetailModule',
      },
    ],
  }, {
    path: 'season-type',
    loadChildren: './main/season-type/season-type.module#SeasonTypeModule',
  }, {
    path: 'add-season-type',
    loadChildren: './main/season-type/conf/add/add.module#AddModule',
  }, {
    path: 'view-season-type',
    children: [
      {
        path: ':id',
        loadChildren: './main/season-type/conf/detail/detail.module#DetailModule',
      },
    ],
  }, {
    path: 'tax',
    loadChildren: './main/tax/tax.module#TaxModule',
  }, {
    path: 'add-tax',
    loadChildren: './main/tax/conf/add/add.module#AddModule',
  }, {
    path: 'view-tax',
    children: [
      {
        path: ':id',
        loadChildren: './main/tax/conf/detail/detail.module#DetailModule',
      },
    ],
  }, {
    path: 'booking',
    loadChildren: './main/booking/booking.module#BookingModule',
  }, {
    path: 'miscellaneous-sales',
    loadChildren: './main/miscellaneous-sales/miscellaneous-sales.module#MiscellaneousSalesModule',
  }, {
    path: 'user',
    loadChildren: './main/user/user.module#UserModule',
  }, {
    path: 'add-user',
    loadChildren: './main/user/conf/add/add.module#AddModule',
  }, {
    path: 'view-user',
    children: [
      {
        path: ':id',
        loadChildren: './main/user/conf/detail/detail.module#DetailModule',
      },
    ],
  }, {
    path: 'privilege',
    loadChildren: './main/privilege/privilege.module#PrivilegeModule',
  },  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
