import {Component, Input, OnInit} from '@angular/core';
import {Department} from '../../../model/department.model';

@Component({
  selector: 'app-bot-nav',
  templateUrl: './bot-nav.component.html',
  styleUrls: ['./bot-nav.component.css']
})
export class BotNavComponent implements OnInit {
  @Input()
  departments: Department[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
