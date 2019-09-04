import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBookingRoomComponent } from './action-booking-room.component';

describe('ActionBookingRoomComponent', () => {
  let component: ActionBookingRoomComponent;
  let fixture: ComponentFixture<ActionBookingRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionBookingRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionBookingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
