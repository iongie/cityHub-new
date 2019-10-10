import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUserShiftComponent } from './report-user-shift.component';

describe('ReportUserShiftComponent', () => {
  let component: ReportUserShiftComponent;
  let fixture: ComponentFixture<ReportUserShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportUserShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUserShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
