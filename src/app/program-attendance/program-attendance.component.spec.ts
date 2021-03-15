import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramAttendanceComponent } from './program-attendance.component';

describe('ProgramAttendanceComponent', () => {
  let component: ProgramAttendanceComponent;
  let fixture: ComponentFixture<ProgramAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
