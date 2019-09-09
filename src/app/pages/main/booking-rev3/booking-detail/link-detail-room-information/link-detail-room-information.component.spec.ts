import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkDetailRoomInformationComponent } from './link-detail-room-information.component';

describe('LinkDetailRoomInformationComponent', () => {
  let component: LinkDetailRoomInformationComponent;
  let fixture: ComponentFixture<LinkDetailRoomInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkDetailRoomInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkDetailRoomInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
