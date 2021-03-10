import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartItem} from '../../../model/cartItem.model';
import {Wish} from '../../../model/wish.model';

@Component({
  selector: 'app-added-to-wish',
  templateUrl: './added-to-wish.component.html',
  styleUrls: ['./added-to-wish.component.css']
})
export class AddedToWishComponent implements OnInit {

  @Input()
  wish: Wish = new Wish();
  @Output()
  closeModal: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  closeWishModal(): void {
    this.closeModal.emit();
  }
}
