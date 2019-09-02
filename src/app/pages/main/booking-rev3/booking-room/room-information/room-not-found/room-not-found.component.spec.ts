import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomNotFoundComponent } from './room-not-found.component';

describe('RoomNotFoundComponent', () => {
  let component: RoomNotFoundComponent;
  let fixture: ComponentFixture<RoomNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
