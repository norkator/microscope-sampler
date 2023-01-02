import {HttpHeaders} from '@angular/common/http';

export class ConstantsModule {

  public static httpResponseCodes: any = {
    OK: 200,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
  };

  // Browser local storage keys
  public static LOCAL_STORAGE_SELECTED_CATEGORY = 'ls_selected_category';

  // Http options
  public static httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

}
