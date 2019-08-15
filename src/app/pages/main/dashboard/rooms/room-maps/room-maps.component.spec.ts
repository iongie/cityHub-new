import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomMapsComponent } from './room-maps.component';

describe('RoomMapsComponent', () => {
  let component: RoomMapsComponent;
  let fixture: ComponentFixture<RoomMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
