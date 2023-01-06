import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  uploadSampleImage(fileName: string, contentType: string, file: any): Observable<any> {
    return this.http.post(environment.api + '/sample-image', {
      filename: fileName,
      content_type: contentType,
      file: file,
    }, ConstantsModule.httpOptions);
  }

}
