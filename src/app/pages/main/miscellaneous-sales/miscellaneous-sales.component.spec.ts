import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousSalesComponent } from './miscellaneous-sales.component';

describe('MiscellaneousSalesComponent', () => {
  let component: MiscellaneousSalesComponent;
  let fixture: ComponentFixture<MiscellaneousSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
