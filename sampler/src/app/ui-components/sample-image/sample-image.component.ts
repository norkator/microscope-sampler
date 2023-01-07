import {Component, Input, OnInit} from '@angular/core';
import {SampleImageInterface} from "../../interfaces";

@Component({
  selector: 'app-sample-image',
  templateUrl: './sample-image.component.html',
  styleUrls: ['./sample-image.component.scss']
})
export class SampleImageComponent implements OnInit {
  @Input() public image: SampleImageInterface | null = null;

  public imageViewModalOpen: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
