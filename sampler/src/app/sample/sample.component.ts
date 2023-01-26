import {Component, OnInit} from '@angular/core';
import {SampleImageInterface, SampleInterface} from "../interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SampleService} from "../samples/sample.service";
import {Location} from '@angular/common';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {

  public sample: SampleInterface | null = null;
  public sampleDetailsModalOpen: boolean = false;
  public imageUploadModalOpen: boolean = false;
  public sampleFormGroup!: FormGroup;
  public sampleImages: SampleImageInterface[] = [];
  public imagesCount: number = 0;
  public loadedImagesCount: number = 0;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private sampleService: SampleService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((params: Params | { sample_group_id: number, sample_id: number }) => {
      this.getSample(params.sample_id);
    });
  }

  ngOnInit(): void {
    this.sampleFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      date_time: [this.getFormattedDate(new Date()), [Validators.required]],
      centrifuge_minutes: [this.sample?.centrifuge_minutes || 0, [Validators.required]],
      centrifuge_rpm: [this.sample?.centrifuge_rpm || 0, [Validators.required]],
      centrifuge_rcf: [this.sample?.centrifuge_rcf || 0, [Validators.required]],
      centrifugation_completed: [false, []],
    });
  }

  private getSample(sampleId: number): void {
    this.sampleService.getSample(sampleId).subscribe({
      next: (data: SampleInterface) => {
        this.sample = data;
        this.initSampleFormGroup();
        this.getSampleImages();
      },
      error: (error: any) => console.error(error)
    });
  }

  private initSampleFormGroup(): void {
    this.sampleFormGroup.controls['name'].setValue(this.sample?.name);
    this.sampleFormGroup.controls['date_time'].setValue(
      this.getFormattedDate(new Date(Date.parse(this.sample?.date_time || new Date().toISOString())))
    );
    this.sampleFormGroup.controls['centrifuge_minutes'].setValue(this.sample?.centrifuge_minutes);
    this.sampleFormGroup.controls['centrifuge_rpm'].setValue(this.sample?.centrifuge_rpm);
    this.sampleFormGroup.controls['centrifuge_rcf'].setValue(this.sample?.centrifuge_rcf);
    this.sampleFormGroup.controls['centrifugation_completed'].setValue(this.sample?.centrifugation_completed);
  }

  private getFormattedDate(date: Date): string {
    return (new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
  }

  public saveSample(): void {
    if (this.sample !== null) {
      this.sampleService.updateSample(
        this.sample.id,
        this.sampleFormGroup.controls['name'].value,
        this.sampleFormGroup.controls['date_time'].value,
        this.sampleFormGroup.controls['centrifuge_minutes'].value,
        this.sampleFormGroup.controls['centrifuge_rpm'].value,
        this.sampleFormGroup.controls['centrifuge_rcf'].value,
        this.sampleFormGroup.controls['centrifugation_completed'].value,
        this.sample.sample_group_id,
      ).subscribe({
        next: (data: SampleInterface) => {
          this.sample = data;
          this.sampleDetailsModalOpen = false;
          this.initSampleFormGroup();
        },
        error: (error: any) => console.error(error)
      });
    }
  }

  public imageUploaded(): void {
    this.imageUploadModalOpen = false;
    this.getSampleImages();
  }

  private getSampleImages(): void {
    if (this.sample !== null) {
      this.sampleService.getSampleImages(this.sample.id).subscribe({
        next: (data: SampleImageInterface[]) => {
          this.sampleImages = [];
          this.getSampleImageData(data);
        },
        error: (error: any) => console.error(error)
      });
    }
  }

  private getSampleImageData(sampleImages: SampleImageInterface[]): void {
    this.imagesCount = sampleImages.length;
    sampleImages.forEach((sampleImage: SampleImageInterface) => {
      this.sampleService.getSampleImageData(sampleImage.file_name).subscribe({
        next: (data: any) => {
          const image: SampleImageInterface = sampleImage;
          image.imageData = URL.createObjectURL(data);
          this.sampleImages.push(image);
          this.loadedImagesCount++;
          if (this.loadedImagesCount === this.imagesCount) {
          }
        },
        error: (error: any) => console.error(error)
      });
    });
  }

  public deleteImage(sampleImage: SampleImageInterface): void {
    this.sampleService.deleteSampleImage(sampleImage.id).subscribe({
      next: () => {
        this.sampleImages = this.sampleImages.filter((s: SampleImageInterface) => {
          return s.id !== sampleImage.id;
        });
      },
      error: (error: any) => console.error(error)
    });
  }

  public return() {
    this.location.back();
  }

}
