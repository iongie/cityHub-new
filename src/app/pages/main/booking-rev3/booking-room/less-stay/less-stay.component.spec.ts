import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessStayComponent } from './less-stay.component';

describe('LessStayComponent', () => {
  let component: LessStayComponent;
  let fixture: ComponentFixture<LessStayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessStayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessStayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
