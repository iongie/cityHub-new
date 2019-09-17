import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousSalesDetailLinkComponent } from './miscellaneous-sales-detail-link.component';

describe('MiscellaneousSalesDetailLinkComponent', () => {
  let component: MiscellaneousSalesDetailLinkComponent;
  let fixture: ComponentFixture<MiscellaneousSalesDetailLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousSalesDetailLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousSalesDetailLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
