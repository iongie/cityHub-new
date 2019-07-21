import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonTypeComponent } from './season-type.component';

describe('SeasonTypeComponent', () => {
  let component: SeasonTypeComponent;
  let fixture: ComponentFixture<SeasonTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
