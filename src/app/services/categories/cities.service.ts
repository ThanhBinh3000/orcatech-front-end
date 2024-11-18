import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../shared/base.service";

@Injectable({
  providedIn: 'root'
})
export class CitiesService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'categories','cities');
  }
}
