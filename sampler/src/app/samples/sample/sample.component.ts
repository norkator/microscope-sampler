import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
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
  @Output() public sampleCreated = new EventEmitter();
  @Output() public sampleUpdated = new EventEmitter();

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
      date_time: [this.getFormattedDate(new Date()), [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges | any) {
    if (changes.sample && this.sample && this.sample.id > 0) {
      this.sampleFormGroup.controls['name'].setValue(this.sample.name);
      this.sampleFormGroup.controls['date_time'].setValue(
        this.getFormattedDate(new Date(Date.parse(this.sample.date_time)))
      );
    }
  }

  private getFormattedDate(date: Date): string {
    return (new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
  }

  public saveSample(): void {
    if (this.sampleGroupId && this.sampleGroupId > 0) {
      if (this.sample?.id) {
        this.sampleService.updateSample(
          this.sample.id,
          this.sampleFormGroup.controls['name'].value,
          this.sampleFormGroup.controls['date_time'].value,
          this.sample.sample_group_id,
        ).subscribe({
          next: (data: SampleInterface) => {
            this.sample = data;
            this.sampleUpdated.emit(this.sample);
          },
          error: (error: any) => console.error(error)
        });
      } else {
        this.sampleService.createSample(
          this.sampleFormGroup.controls['name'].value,
          this.sampleFormGroup.controls['date_time'].value,
          this.sampleGroupId,
        ).subscribe({
          next: (data: SampleInterface) => {
            this.sample = data;
            this.sampleCreated.emit(this.sample);
          },
          error: (error: any) => console.error(error)
        });
      }
    }
  }

  public imageUploaded(): void {
    this.imageUploadModalOpen = false;
  }

}
