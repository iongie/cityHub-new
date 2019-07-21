import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomOperationComponent } from './room-operation.component';

describe('RoomOperationComponent', () => {
  let component: RoomOperationComponent;
  let fixture: ComponentFixture<RoomOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
