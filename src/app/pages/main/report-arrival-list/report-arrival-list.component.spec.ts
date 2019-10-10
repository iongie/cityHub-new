import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportArrivalListComponent } from './report-arrival-list.component';

describe('ReportArrivalListComponent', () => {
  let component: ReportArrivalListComponent;
  let fixture: ComponentFixture<ReportArrivalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportArrivalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportArrivalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
