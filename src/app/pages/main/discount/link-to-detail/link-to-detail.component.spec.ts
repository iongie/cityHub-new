import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkToDetailComponent } from './link-to-detail.component';

describe('LinkToDetailComponent', () => {
  let component: LinkToDetailComponent;
  let fixture: ComponentFixture<LinkToDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkToDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkToDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
