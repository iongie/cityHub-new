import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraChargeCategoryComponent } from './extra-charge-category.component';

describe('ExtraChargeCategoryComponent', () => {
  let component: ExtraChargeCategoryComponent;
  let fixture: ComponentFixture<ExtraChargeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraChargeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraChargeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
