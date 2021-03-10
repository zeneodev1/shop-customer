import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartItem} from '../../../model/cartItem.model';

@Component({
  selector: 'app-added-to-cart',
  templateUrl: './added-to-cart.component.html',
  styleUrls: ['./added-to-cart.component.css']
})
export class AddedToCartComponent implements OnInit {
  @Input()
  cartItem: CartItem = new CartItem();
  @Output()
  closeModal: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  closeCartModal(): void {
    this.closeModal.emit();
  }
}
