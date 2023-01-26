import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SampleService} from "../../samples/sample.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input() public sampleId: number | undefined = undefined;
  @Output() public imageUploaded = new EventEmitter();

  // @ts-ignore
  private constraints: any = window.constraints = {
    audio: false,
    video: true
  };

  private video: HTMLVideoElement | null = null;
  private captureCanvas: HTMLCanvasElement | null = null;
  private fileInput: HTMLInputElement | null = null;
  public uploaded: boolean = false;
  public cameraRunning: boolean = false;
  private videoCaptureWidth: number = 0;
  private videoCaptureHeight: number = 0;


  constructor(
    private sampleService: SampleService,
  ) {
    this.uploaded = false;
  }

  ngOnInit(): void {
    this.uploaded = false;
  }

  public fileSelected(event: any): void {
    const file: File = event.target.files.item(0);
    if (file !== null && this.sampleId !== undefined) {
      const blob = file.slice(0, file.size, 'image/jpeg');
      const modifiedFile = new File([blob], String(Date.now()) + '.jpeg', {type: file.type});
      this.sampleService.uploadSampleImage(this.sampleId, modifiedFile).subscribe({
        next: (data: any) => {
          console.info(data);
          this.imageUploaded.emit();
        },
        error: (error: any) => console.error(error)
      });
    }
  }

  public captureImage(): void {
    if (this.video !== null && this.captureCanvas !== null && this.sampleId !== undefined) {
      const ctx = this.captureCanvas.getContext("2d");
      this.captureCanvas.width = this.videoCaptureWidth;
      this.captureCanvas.height = this.videoCaptureHeight;
      // @ts-ignore
      ctx.drawImage(this.video, 0, 0, this.videoCaptureWidth, this.videoCaptureHeight);
      this.captureCanvas.toBlob((blob: Blob | null) => {
        if (blob !== null) {
          const file = new File([blob], String(Date.now()) + '.jpeg');
          const dT = new DataTransfer();
          dT.items.add(file);
          // @ts-ignore
          this.fileInput.files = dT.files;
          if (this.fileInput?.files) {
            // @ts-ignore
            this.sampleService.uploadSampleImage(this.sampleId, this.fileInput.files[0]).subscribe({
              next: () => {
                this.stopStream();
              },
              error: (error: any) => console.error(error)
            });
          }
        }
      });
    } else {
      console.error('video, captureCanvas or fileInput is null');
    }
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

    this.video = document.querySelector('video');
    this.captureCanvas = document.getElementById('captureCanvas') as HTMLCanvasElement;
    this.fileInput = document.getElementById('fileInput') as HTMLInputElement;

    if (this.video !== null) {
      const _this = this;
      this.video.addEventListener('loadedmetadata', function (e) {
        console.log(this.videoWidth, this.videoHeight);
        _this.videoCaptureWidth = this.videoWidth;
        _this.videoCaptureHeight = this.videoHeight;
      }, false);
    }

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
    this.uploaded = true;
    this.imageUploaded.emit();
  }

}
