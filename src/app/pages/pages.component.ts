import { Component, OnInit, OnDestroy } from '@angular/core';

import { MENU_ITEMS, MENU_ITEMS_NO_ADMIN } from './pages-menu';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit, OnDestroy {
  menu = MENU_ITEMS;
  private subs = new Subject();

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  ngOnInit() {
    // const data = localStorage.getItem('sd_l1oxt');
    
    // if(data === 'rtXfhd!skd1') {
    //   this.menu = MENU_ITEMS;
    // }
    // if (data === 'rtXfhd!skd2'){
    //   this.menu = MENU_ITEMS;
    // }
    // if (data === 'rtXfhd!skd3'){
    //   this.menu = MENU_ITEMS;
    // }
    // if (data === 'rtXfhd!skd4'){
    //   this.menu = MENU_ITEMS;
    // }
    // if (data === 'rtXfhd!skd5') {
    //   this.menu = MENU_ITEMS_NO_ADMIN;
    // }
    // if (data === 'rtXfhd!skd6') {
    //   this.menu = MENU_ITEMS_NO_ADMIN;
    // }
    // if (data === 'rtXfhd!skd7') {
    //   this.menu = MENU_ITEMS_NO_ADMIN;
    // }
    // if (data === 'rtXfhd!skd8') {
    //   this.menu = MENU_ITEMS_NO_ADMIN;
    // }
    // if (data === 'rtXfhd!skd9') {
    //   this.menu = MENU_ITEMS_NO_ADMIN;
    // }
    // if (data === 'rtXfhd!skd10') {
    //   this.menu = MENU_ITEMS_NO_ADMIN;
    // }
  }
}
