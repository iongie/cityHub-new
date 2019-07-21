import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FloorService } from '../../../../../services/floor/floor.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private floorServ: FloorService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  viewById() {
    this.activeRoute.params.subscribe(params => {
      const floorId = {
        id: params.id,
      };
      this.floorServ.getById(floorId).pipe(takeUntil(this.subs)).subscribe(resById => {
        console.log(resById);
      });
    });
  }

}
