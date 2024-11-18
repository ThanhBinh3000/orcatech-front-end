import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../shared/storage.service';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../shared/base.service";
import {ResponseData} from '../../models/response-data';
import {STORAGE_KEY} from '../../constants/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(private router: Router, private storageService: StorageService, httpClient: HttpClient) {
    super(httpClient, 'security', '');
  }

  getToken(): string {
    // @ts-ignore
    return JSON.parse(this.storageService.getString(STORAGE_KEY.ACCESS_TOKEN));
  }

  getLogout() {
    localStorage.clear();
    this.router.navigate(['/system/login']).then(r => {
    });
  }

  saveToken(token: string) {
    return this.storageService.set(STORAGE_KEY.ACCESS_TOKEN, token);
  }

  saveUser(user: any) {
    return this.storageService.set(STORAGE_KEY.USER_INFO, user);
  }

  saveCompany(data: any) {
    return this.storageService.set(STORAGE_KEY.COMPANY, data);
  }

  getUser() {
    return this.storageService.get(STORAGE_KEY.USER_INFO);
  }

  getCompany() {
    return this.storageService.get(STORAGE_KEY.USER_INFO)?.company;
  }

  isLogin() {
    return (!(this.getUser() == null || this.getUser() == undefined));
  }

  getLogin(body: any) {
    const url = `/api/${this.gateway}/login`;
    return this.httpClient.post<ResponseData>(url, body).toPromise();
  }

  profile() {
    const url = `/api/${this.gateway}/profile`;
    return this.httpClient.get<ResponseData>(url).toPromise();
  }
}
