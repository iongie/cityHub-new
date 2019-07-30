import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekendTariffComponent } from './weekend-tariff.component';

describe('WeekendTariffComponent', () => {
  let component: WeekendTariffComponent;
  let fixture: ComponentFixture<WeekendTariffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekendTariffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekendTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
