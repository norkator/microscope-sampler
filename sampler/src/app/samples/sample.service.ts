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

}
