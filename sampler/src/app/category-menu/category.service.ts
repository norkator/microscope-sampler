import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ConstantsModule} from "../constants-module";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) {
  }

  getCategories(): Observable<any> {
    return this.http.get(environment.api + '/categories', ConstantsModule.httpOptions);
  }

}
