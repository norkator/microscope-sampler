import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';


@Pipe({name: 'SafeImage'})
export class SafeImage implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  transform(content: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(content);
  }
}
