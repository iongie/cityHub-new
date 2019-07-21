import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-under-constraction',
  templateUrl: './under-constraction.component.html',
  styleUrls: ['./under-constraction.component.scss'],
})
export class UnderConstractionComponent implements OnInit {

  constructor(
    private menuService: NbMenuService,
    private location: Location,
  ) { }

  ngOnInit() {
  }

  goToHome() {
    this.location.back();
  }

}
