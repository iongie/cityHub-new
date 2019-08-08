import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyInformationComponent } from './property-information.component';

describe('PropertyInformationComponent', () => {
  let component: PropertyInformationComponent;
  let fixture: ComponentFixture<PropertyInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
