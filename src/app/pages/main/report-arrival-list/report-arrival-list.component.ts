import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportService } from '../../../services/report/report.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-report-arrival-list',
  templateUrl: './report-arrival-list.component.html',
  styleUrls: ['./report-arrival-list.component.scss'],
})
export class ReportArrivalListComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  constructor(
    public reportServ: ReportService,
  ) { }

  ngOnInit() {
    this.getReportArrivalList();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getReportArrivalList() {
    const report = {
      toDate: '',
      fromDate: '',
    };
    this.reportServ.getArrivalListReport(report)
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      console.log('tes');
    })
  }

}
