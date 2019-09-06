import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStayComponent } from './add-stay.component';

describe('AddStayComponent', () => {
  let component: AddStayComponent;
  let fixture: ComponentFixture<AddStayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
