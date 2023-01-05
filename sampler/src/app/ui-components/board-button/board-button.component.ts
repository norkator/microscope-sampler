import {Component, Input, OnInit} from '@angular/core';
import {BoardButtonSizeType} from "../../typings";

@Component({
  selector: 'app-board-button',
  templateUrl: './board-button.component.html',
  styleUrls: ['./board-button.component.scss']
})
export class BoardButtonComponent implements OnInit {
  @Input() public size: BoardButtonSizeType = 'big';
  @Input() public isAddBtn: boolean = false;
  @Input() public isSelected: boolean = false;
  @Input() public title: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
