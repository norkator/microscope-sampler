import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {SampleImageInterface, SampleInterface} from "../interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SampleService} from "../samples/sample.service";

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {

  public sample: SampleInterface | null = null;
  public sampleGroupId: number | undefined;
  public sampleCreated = new EventEmitter();
  public sampleUpdated = new EventEmitter();

  public sampleDetailsModalOpen: boolean = false;
  public imageUploadModalOpen: boolean = false;
  public sampleFormGroup!: FormGroup;
  public sampleImages: SampleImageInterface[] = [];
  public imagesCount: number = 0;
  public loadedImagesCount: number = 0;

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

      this.sampleImages = [];
      this.imagesCount = 0;
      this.loadedImagesCount = 0;
      this.getSampleImages();
    }
  }

  private getFormattedDate(date: Date): string {
    return (new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
  }

  public saveSample(): void {
    // if (this.sampleGroupId && this.sampleGroupId > 0) {
    //   if (this.sample?.id) {
    //     this.sampleService.updateSample(
    //       this.sample.id,
    //       this.sampleFormGroup.controls['name'].value,
    //       this.sampleFormGroup.controls['date_time'].value,
    //       this.sample.sample_group_id,
    //     ).subscribe({
    //       next: (data: SampleInterface) => {
    //         this.sample = data;
    //         this.sampleUpdated.emit(this.sample);
    //         this.sampleDetailsModalOpen = false;
    //       },
    //       error: (error: any) => console.error(error)
    //     });
    //   } else {
    //     this.sampleService.createSample(
    //       this.sampleFormGroup.controls['name'].value,
    //       this.sampleFormGroup.controls['date_time'].value,
    //       this.sampleGroupId,
    //     ).subscribe({
    //       next: (data: SampleInterface) => {
    //         this.sample = data;
    //         this.sampleCreated.emit(this.sample);
    //         this.sampleDetailsModalOpen = false;
    //       },
    //       error: (error: any) => console.error(error)
    //     });
    //   }
    // }
  }

  public imageUploaded(): void {
  }

  private getSampleImages(): void {
    if (this.sample !== null) {
      this.sampleService.getSampleImages(this.sample.id).subscribe({
        next: (data: SampleImageInterface[]) => {
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

}
