import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-board-button',
  templateUrl: './board-button.component.html',
  styleUrls: ['./board-button.component.scss']
})
export class BoardButtonComponent implements OnInit {
  @Input() public isAddBtn: boolean = false;
  @Input() public title: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}