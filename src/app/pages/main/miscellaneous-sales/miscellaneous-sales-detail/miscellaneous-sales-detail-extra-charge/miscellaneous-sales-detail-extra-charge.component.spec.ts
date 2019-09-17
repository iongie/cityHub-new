import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousSalesDetailExtraChargeComponent } from './miscellaneous-sales-detail-extra-charge.component';

describe('MiscellaneousSalesDetailExtraChargeComponent', () => {
  let component: MiscellaneousSalesDetailExtraChargeComponent;
  let fixture: ComponentFixture<MiscellaneousSalesDetailExtraChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousSalesDetailExtraChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousSalesDetailExtraChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
