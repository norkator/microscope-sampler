import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SampleImageInterface} from "../../interfaces";

@Component({
  selector: 'app-sample-image',
  templateUrl: './sample-image.component.html',
  styleUrls: ['./sample-image.component.scss']
})
export class SampleImageComponent implements OnInit {
  @Input() public image: SampleImageInterface | null = null;
  @Output() public deleteImageClick = new EventEmitter();

  public imageViewModalOpen: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public deleteImage(): void {
    this.deleteImageClick.emit();
    this.imageViewModalOpen = false;
  }

}
