import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveRoomComponent } from './move-room.component';

describe('MoveRoomComponent', () => {
  let component: MoveRoomComponent;
  let fixture: ComponentFixture<MoveRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
