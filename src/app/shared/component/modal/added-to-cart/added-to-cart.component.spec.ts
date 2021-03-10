import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedToCartComponent } from './added-to-cart.component';

describe('AddedToCartComponent', () => {
  let component: AddedToCartComponent;
  let fixture: ComponentFixture<AddedToCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedToCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
