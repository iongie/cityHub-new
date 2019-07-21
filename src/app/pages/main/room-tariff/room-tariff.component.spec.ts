import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTariffComponent } from './room-tariff.component';

describe('RoomTariffComponent', () => {
  let component: RoomTariffComponent;
  let fixture: ComponentFixture<RoomTariffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomTariffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
