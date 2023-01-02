import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() public modalClosedClick = new EventEmitter();
  @Input() public isOpen: boolean = false;
  @Input() public title: string = '';


  constructor() {
  }

  ngOnInit(): void {
  }

  public closeModal(): void {
    this.isOpen = !this.isOpen
    this.modalClosedClick.emit();
  }

}
