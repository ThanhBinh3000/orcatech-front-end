import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseService} from '../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'file', 'file');
  }

  getUrl(urlFile: string): Observable<ArrayBuffer> {
    const url = `/api/${this.gateway}/${this.controller}/${urlFile}`;
    return this.httpClient.get(url, {responseType: 'arraybuffer'});
  }
}
