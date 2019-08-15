import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSelector2Component } from './room-selector2.component';

describe('RoomSelector2Component', () => {
  let component: RoomSelector2Component;
  let fixture: ComponentFixture<RoomSelector2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomSelector2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSelector2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
