import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeInformationComponent } from './charge-information.component';

describe('ChargeInformationComponent', () => {
  let component: ChargeInformationComponent;
  let fixture: ComponentFixture<ChargeInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeInformationComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
