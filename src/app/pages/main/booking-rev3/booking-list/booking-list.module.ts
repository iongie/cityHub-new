import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingListComponent } from './booking-list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UnderConstractionModule } from '../../under-constraction/under-constraction.module';
import { LinkDetailModule } from './link-detail/link-detail.module';
const routes: Routes = [
  {
    path: '',
    component: BookingListComponent,
  },
];
@NgModule({
  declarations: [BookingListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    LinkDetailModule,
    // UnderConstractionModule,
  ]
})
export class BookingListModule { }
