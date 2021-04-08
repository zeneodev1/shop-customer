import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectShippingModalComponent } from './select-shipping-modal.component';

describe('SelectShippingModalComponent', () => {
  let component: SelectShippingModalComponent;
  let fixture: ComponentFixture<SelectShippingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectShippingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectShippingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
