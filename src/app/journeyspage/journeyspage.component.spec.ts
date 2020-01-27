import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyspageComponent } from './journeyspage.component';

describe('JourneyspageComponent', () => {
  let component: JourneyspageComponent;
  let fixture: ComponentFixture<JourneyspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
