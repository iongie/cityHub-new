import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousSalesExtendComponent } from './miscellaneous-sales-extend.component';

describe('MiscellaneousSalesExtendComponent', () => {
  let component: MiscellaneousSalesExtendComponent;
  let fixture: ComponentFixture<MiscellaneousSalesExtendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousSalesExtendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousSalesExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
