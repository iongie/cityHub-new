import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  public data: any;
  constructor() { }

  ngOnInit() {
  }

  public onNumberGenerated(data: any) {
    this.data = data;
  }

}
