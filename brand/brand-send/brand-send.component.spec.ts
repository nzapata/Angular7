import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSendComponent } from './brand-send.component';

describe('BrandSendComponent', () => {
  let component: BrandSendComponent;
  let fixture: ComponentFixture<BrandSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
