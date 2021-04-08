import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingEstimatorComponent } from './shipping-estimator.component';

describe('ShippingEstimatorComponent', () => {
  let component: ShippingEstimatorComponent;
  let fixture: ComponentFixture<ShippingEstimatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingEstimatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingEstimatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
