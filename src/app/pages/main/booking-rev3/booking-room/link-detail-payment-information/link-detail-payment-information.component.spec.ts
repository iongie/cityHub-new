import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkDetailPaymentInformationComponent } from './link-detail-payment-information.component';

describe('LinkDetailPaymentInformationComponent', () => {
  let component: LinkDetailPaymentInformationComponent;
  let fixture: ComponentFixture<LinkDetailPaymentInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkDetailPaymentInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkDetailPaymentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
