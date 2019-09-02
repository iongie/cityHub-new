import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeTotalComponent } from './charge-total.component';

describe('ChargeTotalComponent', () => {
  let component: ChargeTotalComponent;
  let fixture: ComponentFixture<ChargeTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
