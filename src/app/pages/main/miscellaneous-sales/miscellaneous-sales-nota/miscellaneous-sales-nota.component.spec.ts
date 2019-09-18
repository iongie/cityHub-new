import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousSalesNotaComponent } from './miscellaneous-sales-nota.component';

describe('MiscellaneousSalesNotaComponent', () => {
  let component: MiscellaneousSalesNotaComponent;
  let fixture: ComponentFixture<MiscellaneousSalesNotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousSalesNotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousSalesNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
