import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramAddToResidentComponent } from './program-add-to-resident.component';

describe('ProgramAddToResidentComponent', () => {
  let component: ProgramAddToResidentComponent;
  let fixture: ComponentFixture<ProgramAddToResidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramAddToResidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramAddToResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
