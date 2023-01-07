import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ConstantsModule} from "../constants-module";

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getSampleGroup(sampleGroupId: number): Observable<any> {
    return this.http.get(environment.api + '/sample-group/' + sampleGroupId, ConstantsModule.httpOptions);
  }

  getSample(sampleId: number): Observable<any> {
    return this.http.get(environment.api + '/sample/' + sampleId, ConstantsModule.httpOptions);
  }

  getSamples(sampleGroupId: number): Observable<any> {
    return this.http.get(environment.api + '/samples/' + sampleGroupId, ConstantsModule.httpOptions);
  }

  createSample(name: string, dateTime: string, sampleGroupId: number): Observable<any> {
    return this.http.post(environment.api + '/sample', {
      name: name,
      date_time: dateTime,
      sample_group_id: sampleGroupId,
    }, ConstantsModule.httpOptions);
  }

  updateSample(id: number, name: string, dateTime: string, sampleGroupId: number): Observable<any> {
    return this.http.put(environment.api + '/sample', {
      id: id,
      name: name,
      date_time: dateTime,
      sample_group_id: sampleGroupId,
    }, ConstantsModule.httpOptions);
  }

  uploadSampleImage(sampleId: number, file: File): Observable<any> {
    const headers = new HttpHeaders({
      'sampleid': String(sampleId),
    });
    let formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.api + '/sample-image', formData, {headers});
  }

  getSampleImages(sampleId: number): Observable<any> {
    return this.http.get(environment.api + '/sample-images/' + sampleId, ConstantsModule.httpOptions);
  }

  getSampleImageData(fileName: string): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'image/jpeg',
    });
    return this.http.get(environment.api + '/sample-image/' + fileName, {headers, responseType: 'blob'});
  }

  deleteSampleImage(imageId: number): Observable<any> {
    return this.http.delete(environment.api + '/sample-image/' + imageId, ConstantsModule.httpOptions);
  }

}
