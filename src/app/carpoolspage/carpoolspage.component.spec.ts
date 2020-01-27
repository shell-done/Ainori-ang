import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolspageComponent } from './carpoolspage.component';

describe('CarpoolspageComponent', () => {
  let component: CarpoolspageComponent;
  let fixture: ComponentFixture<CarpoolspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpoolspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpoolspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
