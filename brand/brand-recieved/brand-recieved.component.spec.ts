import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandRecievedComponent } from './brand-recieved.component';

describe('BrandRecievedComponent', () => {
  let component: BrandRecievedComponent;
  let fixture: ComponentFixture<BrandRecievedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandRecievedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandRecievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
