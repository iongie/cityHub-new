import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-extra-charge',
  templateUrl: './extra-charge.component.html',
  styleUrls: ['./extra-charge.component.scss']
})
export class ExtraChargeComponent implements OnInit {
  @Input() value: any;
  constructor() { }

  ngOnInit() {
  }

}
