import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentsAddComponent } from './residents-add.component';

describe('ResidentsAddComponent', () => {
  let component: ResidentsAddComponent;
  let fixture: ComponentFixture<ResidentsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
