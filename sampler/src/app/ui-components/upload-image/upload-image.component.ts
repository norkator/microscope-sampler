import {Component, Input, OnInit} from '@angular/core';
import {SampleService} from "../../samples/sample.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input() public sampleId: number | undefined = undefined;

  // @ts-ignore
  private constraints: any = window.constraints = {
    audio: false,
    video: true
  };

  private video: HTMLVideoElement | null = null;
  public cameraRunning: boolean = false;
  private fileToUpload: File | null = null;

  constructor(
    private sampleService: SampleService,
  ) {
  }

  ngOnInit(): void {
    this.video = document.querySelector('video');
  }

  public fileSelected(event: any): void {
    const file = event.target.files.item(0);
    if (file !== null) {
      this.sampleService.uploadSampleImage(file).subscribe({
        next: (data: any) => {
          console.info(data);
        },
        error: (error: any) => console.error(error)
      });
    }
  }

  public captureImage(): void {
  }

  private handleSuccess(stream: any) {
    const videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints:', this.constraints);
    console.log(`Using video device: ${videoTracks[0].label}`);
    // @ts-ignore
    window.stream = stream;
    // @ts-ignore
    this.video.srcObject = stream;
  }

  handleError(error: any) {
    if (error.name === 'OverconstrainedError') {
      const v = this.constraints.video;
      this.errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
    } else if (error.name === 'NotAllowedError') {
      this.errorMsg('No permission allowed to access camera');
    }
    this.errorMsg(`getUserMedia error: ${error.name}`, error);
  }

  errorMsg(msg: any, error?: any) {
    if (typeof error !== 'undefined') {
      console.error(error);
    }
  }

  public async init(e: any) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
      this.handleSuccess(stream);
      e.target.disabled = true;
      this.cameraRunning = true;
    } catch (e) {
      this.handleError(e);
    }
  }

  private stopStream(): void {
    // @ts-ignore
    window.stream = null;
    // @ts-ignore
    this.video.srcObject = null;
    this.cameraRunning = false;
  }

}
