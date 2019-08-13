import { Component, OnDestroy } from '@angular/core';
import { NbThemeService} from '@nebular/theme';

@Component({
  selector: 'ngx-rooms',
  styleUrls: ['./rooms.component.scss'],
  templateUrl: './rooms.component.html',
})
export class RoomsComponent implements OnDestroy {

  private selected: number;
  themeSubscription: any;

  constructor(private themeService: NbThemeService) 
  {
    this.themeSubscription = this.themeService.onMediaQueryChange()
  }
  select(roomNumber) 
  {
    this.selected = roomNumber;
  }

  private isSelected(roomNumber): boolean {
    return this.selected === roomNumber;
  }

  ngOnDestroy() {
    this.themeSubscription.subscribe();
  }
}
