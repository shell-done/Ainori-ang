import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolpageComponent } from './carpoolpage.component';

describe('CarpoolpageComponent', () => {
  let component: CarpoolpageComponent;
  let fixture: ComponentFixture<CarpoolpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpoolpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpoolpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
