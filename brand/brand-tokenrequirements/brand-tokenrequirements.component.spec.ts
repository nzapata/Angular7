import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandTokenrequirementsComponent } from './brand-tokenrequirements.component';

describe('BrandTokenrequirementsComponent', () => {
  let component: BrandTokenrequirementsComponent;
  let fixture: ComponentFixture<BrandTokenrequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandTokenrequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandTokenrequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
