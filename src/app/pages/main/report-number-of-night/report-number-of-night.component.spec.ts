import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNumberOfNightComponent } from './report-number-of-night.component';

describe('ReportNumberOfNightComponent', () => {
  let component: ReportNumberOfNightComponent;
  let fixture: ComponentFixture<ReportNumberOfNightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportNumberOfNightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNumberOfNightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
