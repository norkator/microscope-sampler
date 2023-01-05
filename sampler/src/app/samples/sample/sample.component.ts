import {Component, Input, OnInit} from '@angular/core';
import {SampleInterface} from "../../interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {

  @Input() public sample: SampleInterface | null = null;

  public cameraModalOpen: boolean = false;
  public imageUploadModalOpen: boolean = false;
  public sampleFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.sampleFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  public saveSample(): void {
  }

}
