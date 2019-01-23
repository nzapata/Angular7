import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedIndividualComponent } from './received-individual.component';

describe('ReceivedIndividualComponent', () => {
  let component: ReceivedIndividualComponent;
  let fixture: ComponentFixture<ReceivedIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
