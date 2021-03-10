import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Department} from '../../../model/department.model';

@Component({
  selector: 'app-mob-nav',
  templateUrl: './mob-nav.component.html',
  styleUrls: ['./mob-nav.component.css']
})
export class MobNavComponent implements OnInit {
  @Input()
  hidden = true;
  @Input()
  departments: Department[];
  @Output()
  closeNav: EventEmitter<void>;
  constructor() {
    console.log(this.hidden);
    this.closeNav = new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  closeNavBar(): void {
    this.closeNav.emit();
  }
}
