import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendIndividualComponent } from './send-individual.component';

describe('SendIndividualComponent', () => {
  let component: SendIndividualComponent;
  let fixture: ComponentFixture<SendIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
