import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousSalesDetailComponent } from './miscellaneous-sales-detail.component';

describe('MiscellaneousSalesDetailComponent', () => {
  let component: MiscellaneousSalesDetailComponent;
  let fixture: ComponentFixture<MiscellaneousSalesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousSalesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousSalesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
