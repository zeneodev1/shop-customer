import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedToWishComponent } from './added-to-wish.component';

describe('AddedToWishComponent', () => {
  let component: AddedToWishComponent;
  let fixture: ComponentFixture<AddedToWishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedToWishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedToWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
