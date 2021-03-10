import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-checkout-step-two',
  templateUrl: './checkout-step-two.component.html',
  styleUrls: ['./checkout-step-two.component.css']
})
export class CheckoutStepTwoComponent implements OnInit {
  @Output()
  continue: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  back: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

}
