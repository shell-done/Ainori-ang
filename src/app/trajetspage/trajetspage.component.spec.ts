import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajetspageComponent } from './trajetspage.component';

describe('TrajetspageComponent', () => {
  let component: TrajetspageComponent;
  let fixture: ComponentFixture<TrajetspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrajetspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajetspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
