import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ConstantsModule} from "../constants-module";

@Injectable({
  providedIn: 'root'
})
export class SampleGroupService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getCategory(categoryId: number): Observable<any> {
    return this.http.get(environment.api + '/category/' + categoryId, ConstantsModule.httpOptions);
  }

  getSampleGroups(): Observable<any> {
    return this.http.get(environment.api + '/sample-groups', ConstantsModule.httpOptions);
  }

  createSampleGroup(name: string, categoryId: number): Observable<any> {
    return this.http.post(environment.api + '/sample-group', {
      name: name,
      category_id: categoryId,
    }, ConstantsModule.httpOptions);
  }


}
