import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../shared/base.service";

@Injectable({
  providedIn: 'root'
})
export class WardsService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'categories','wards');
  }
}
