import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraChargeComponent } from './extra-charge.component';

describe('ExtraChargeComponent', () => {
  let component: ExtraChargeComponent;
  let fixture: ComponentFixture<ExtraChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
