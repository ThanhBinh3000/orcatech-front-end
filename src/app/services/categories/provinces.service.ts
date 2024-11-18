import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../shared/base.service";

@Injectable({
  providedIn: 'root'
})
export class ProvincesService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'categories','provinces');
  }
}
