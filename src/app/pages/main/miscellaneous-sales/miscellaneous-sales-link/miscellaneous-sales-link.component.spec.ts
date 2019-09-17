import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousSalesLinkComponent } from './miscellaneous-sales-link.component';

describe('MiscellaneousSalesLinkComponent', () => {
  let component: MiscellaneousSalesLinkComponent;
  let fixture: ComponentFixture<MiscellaneousSalesLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousSalesLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousSalesLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
