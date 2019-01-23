import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeBrandComponent } from './welcome-brand.component';

describe('WelcomeBrandComponent', () => {
  let component: WelcomeBrandComponent;
  let fixture: ComponentFixture<WelcomeBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
