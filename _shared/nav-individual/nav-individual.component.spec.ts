import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavIndividualComponent } from './nav-individual.component';

describe('NavIndividualComponent', () => {
  let component: NavIndividualComponent;
  let fixture: ComponentFixture<NavIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
