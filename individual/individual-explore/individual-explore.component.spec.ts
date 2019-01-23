import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualExploreComponent } from './individual-explore.component';

describe('IndividualExploreComponent', () => {
  let component: IndividualExploreComponent;
  let fixture: ComponentFixture<IndividualExploreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualExploreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
