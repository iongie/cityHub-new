import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSelector3Component } from './room-selector3.component';

describe('RoomSelector3Component', () => {
  let component: RoomSelector3Component;
  let fixture: ComponentFixture<RoomSelector3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomSelector3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSelector3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
