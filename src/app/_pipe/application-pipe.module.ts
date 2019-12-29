import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { OrderByPipe } from './orderBy.pipe';
import { FilterPipe } from './filter.pipe';



@NgModule({
  declarations: [OrderByPipe, FilterPipe],
  exports: [OrderByPipe, FilterPipe]
  // imports: [
  //   CommonModule
  // ]
})
export class ApplicationPipesModule { }
