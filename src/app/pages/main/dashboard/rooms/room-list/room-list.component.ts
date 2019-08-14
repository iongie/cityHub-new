import { Component, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';

@Component({
  selector: 'ngx-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;

  users: { name: string, title: string,  picture: string;  }[] = [
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
  ];
  constructor(private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService) {
this.breakpoints = this.breakpointService.getBreakpointsMap();
this.themeService.onMediaQueryChange()
.subscribe(([oldValue, newValue]) => {
this.breakpoint = newValue;
});
    }

  ngOnInit() {
  }

}
