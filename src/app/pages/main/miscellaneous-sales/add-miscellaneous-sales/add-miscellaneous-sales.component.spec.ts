import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMiscellaneousSalesComponent } from './add-miscellaneous-sales.component';

describe('AddMiscellaneousSalesComponent', () => {
  let component: AddMiscellaneousSalesComponent;
  let fixture: ComponentFixture<AddMiscellaneousSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMiscellaneousSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMiscellaneousSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
