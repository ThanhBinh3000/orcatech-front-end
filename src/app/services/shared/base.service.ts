import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseData} from "../../models/response-data";
import {RECORD_STATUS} from "../../constants/config";

export abstract class BaseService {

  protected constructor(protected httpClient: HttpClient, protected gateway: string, protected controller: string) {
  }

  searchPage(body: any) {
    const url = `/api/${this.gateway}/${this.controller}/search-page`;
    return this.httpClient.post<ResponseData>(url, body).toPromise();
  }

  searchList(body: any) {
    const url = `/api/${this.gateway}/${this.controller}/search-list`;
    return this.httpClient.post<ResponseData>(url, body).toPromise();
  }

  create(body: any) {
    const url = `/api/${this.gateway}/${this.controller}/create`;
    return this.httpClient.post<ResponseData>(url, body).toPromise();
  }

  update(body: any) {
    const url = `/api/${this.gateway}/${this.controller}/update`;
    return this.httpClient.post<ResponseData>(url, body).toPromise();
  }

  approve(body: any) {
    const url = `/api/${this.gateway}/${this.controller}/approve`
    return this.httpClient.post<ResponseData>(url, body).toPromise();
  }

  cancel(body: any) {
    const url = `/api/${this.gateway}/${this.controller}/cancel`
    return this.httpClient.post<ResponseData>(url, body).toPromise();
  }

  getDetail(id: number) {
    const url = `/api/${this.gateway}/${this.controller}/detail/${id}`;
    return this.httpClient.get<ResponseData>(url).toPromise();
  }

  delete(body: any) {
    const url = `/api/${this.gateway}/${this.controller}/delete`;
    return this.httpClient.post<ResponseData>(url, body).toPromise();
  }
}
