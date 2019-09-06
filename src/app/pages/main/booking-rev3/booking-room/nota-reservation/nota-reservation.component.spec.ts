import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaReservationComponent } from './nota-reservation.component';

describe('NotaReservationComponent', () => {
  let component: NotaReservationComponent;
  let fixture: ComponentFixture<NotaReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
