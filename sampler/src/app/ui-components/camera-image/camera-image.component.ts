import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-camera-image',
  templateUrl: './camera-image.component.html',
  styleUrls: ['./camera-image.component.scss']
})
export class CameraImageComponent implements OnInit {

  // @ts-ignore
  private constraints: any = window.constraints = {
    audio: false,
    video: true
  };

  public cameraRunning: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public captureImage(): void {
  }

  private handleSuccess(stream: any) {
    const video = document.querySelector('video');
    const videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints:', this.constraints);
    console.log(`Using video device: ${videoTracks[0].label}`);
    // @ts-ignore
    window.stream = stream;
    // @ts-ignore
    video.srcObject = stream;
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

}
