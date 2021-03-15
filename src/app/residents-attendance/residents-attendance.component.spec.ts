import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentsAttendanceComponent } from './residents-attendance.component';

describe('ResidentsAttendanceComponent', () => {
  let component: ResidentsAttendanceComponent;
  let fixture: ComponentFixture<ResidentsAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentsAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentsAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
