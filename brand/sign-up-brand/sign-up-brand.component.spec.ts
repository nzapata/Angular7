import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpBrandComponent } from './sign-up-brand.component';

describe('SignUpBrandComponent', () => {
  let component: SignUpBrandComponent;
  let fixture: ComponentFixture<SignUpBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
