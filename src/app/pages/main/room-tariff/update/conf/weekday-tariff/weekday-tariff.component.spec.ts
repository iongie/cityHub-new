import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekdayTariffComponent } from './weekday-tariff.component';

describe('WeekdayTariffComponent', () => {
  let component: WeekdayTariffComponent;
  let fixture: ComponentFixture<WeekdayTariffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekdayTariffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekdayTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
