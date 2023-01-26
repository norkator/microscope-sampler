import {Component, OnInit} from '@angular/core';
import {SampleGroupInterface, SampleInterface} from "../interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, NavigationExtras, Params, Router} from "@angular/router";
import {SampleService} from "./sample.service";

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent implements OnInit {

  public sampleGroup: SampleGroupInterface | null = null;
  public samples: SampleInterface[] = [];
  public sampleDetailsModalOpen: boolean = false;
  public sampleFormGroup!: FormGroup;

  constructor(
    private sampleService: SampleService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe((params: Params | { sample_group_id: number }) => {
      this.getSampleGroup(params.sample_group_id);
      this.getSamples(params.sample_group_id);
    });
  }

  ngOnInit(): void {
    this.sampleFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      date_time: [this.getFormattedDate(new Date()), [Validators.required]],
      centrifuge_minutes: [this.sampleGroup?.centrifuge_minutes || 0, [Validators.required]],
      centrifuge_rpm: [this.sampleGroup?.centrifuge_rpm || 0, [Validators.required]],
      centrifuge_rcf: [this.sampleGroup?.centrifuge_rcf || 0, [Validators.required]],
      centrifugation_completed: [false, []],
    });
  }

  private getFormattedDate(date: Date): string {
    return (new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
  }

  private getSampleGroup(sampleGroupId: number): void {
    this.sampleService.getSampleGroup(sampleGroupId).subscribe({
      next: (data: SampleGroupInterface) => {
        this.sampleGroup = data;
        this.initSampleFormGroup();
      },
      error: (error: any) => console.error(error)
    });
  }

  private initSampleFormGroup(): void {
    this.sampleFormGroup.controls['centrifuge_minutes'].setValue(this.sampleGroup?.centrifuge_minutes || 0);
    this.sampleFormGroup.controls['centrifuge_rpm'].setValue(this.sampleGroup?.centrifuge_rpm || 0);
    this.sampleFormGroup.controls['centrifuge_rcf'].setValue(this.sampleGroup?.centrifuge_rcf || 0);
  }

  private getSamples(sampleGroupId: number): void {
    this.sampleService.getSamples(sampleGroupId).subscribe({
      next: (data: SampleInterface[]) => {
        this.samples = data;
      },
      error: (error: any) => console.error(error)
    });
  }

  public openSample(sample: SampleInterface): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        sample_group_id: sample.sample_group_id,
        sample_id: sample.id
      }
    };
    this.router.navigate(['sample'], navigationExtras).then(() => null);
  }

  public sampleCreated(sample: SampleInterface): void {
    this.samples.push(sample);
  }

  public saveSample(): void {
    if (this.sampleGroup?.id && this.sampleGroup.id > 0) {
      this.sampleService.createSample(
        this.sampleFormGroup.controls['name'].value,
        this.sampleFormGroup.controls['date_time'].value,
        this.sampleFormGroup.controls['centrifuge_minutes'].value,
        this.sampleFormGroup.controls['centrifuge_rpm'].value,
        this.sampleFormGroup.controls['centrifuge_rcf'].value,
        this.sampleFormGroup.controls['centrifugation_completed'].value,
        this.sampleGroup.id,
      ).subscribe({
        next: (data: SampleInterface) => {
          this.sampleDetailsModalOpen = false;
          this.sampleCreated(data);
        },
        error: (error: any) => console.error(error)
      });
    }
  }

}
