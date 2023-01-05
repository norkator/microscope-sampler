import {Component, Input, OnInit} from '@angular/core';
import {SampleInterface} from "../../interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SampleService} from "../sample.service";

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {

  @Input() public sample: SampleInterface | null = null;
  @Input() public sampleGroupId: number | undefined;

  public cameraModalOpen: boolean = false;
  public imageUploadModalOpen: boolean = false;
  public sampleFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sampleService: SampleService,
  ) {
  }

  ngOnInit(): void {
    this.sampleFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      date_time: [this.getCurrentDatetime(), [Validators.required]],
    });
  }

  private getCurrentDatetime(): string {
    const d = new Date();
    return (new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
  }

  public saveSample(): void {
    if (this.sampleGroupId && this.sampleGroupId > 0) {
      if (this.sample?.id) {
        console.info('update existing sample');
      } else {
        this.sampleService.createSample(
          this.sampleFormGroup.controls['name'].value,
          this.sampleFormGroup.controls['date_time'].value,
          this.sampleGroupId,
        ).subscribe({
          next: (data: SampleInterface) => {
            this.sample = data;
          },
          error: (error: any) => console.error(error)
        });
      }
    }
  }

}
