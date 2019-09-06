import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendRoomComponent } from './extend-room.component';

describe('ExtendRoomComponent', () => {
  let component: ExtendRoomComponent;
  let fixture: ComponentFixture<ExtendRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
