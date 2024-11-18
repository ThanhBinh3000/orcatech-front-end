import {Component, Injector} from '@angular/core';
import {BaseService} from '../../services/shared/base.service';
import {SpinnerService} from '../../services/shared/spinner.service';
import {Department} from '../../models/department';
import {MatTableDataSource} from '@angular/material/table';
import {DATE_RANGE, PAGE_SIZE_DEFAULT} from '../../constants/config';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NotificationService} from '../../services/shared/notification.service';
import {HttpClient} from '@angular/common/http';
import {StorageService} from '../../services/shared/storage.service';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../services/security/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from "@angular/common";
import {MESSAGE, STATUS_API} from '../../constants/message';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
})
export class BaseComponent {
  // User Info
  userInfo: any;
  department: Department;
  // @ts-ignore
  formGroup: FormGroup;
  dataSource = new MatTableDataSource();
  dataTable: any[] = [];
  page: number = 1;
  pageSize: number = PAGE_SIZE_DEFAULT;
  totalRecord: number = 0;
  totalPages: number = 0;
  fb: FormBuilder = new FormBuilder();
  // Service
  notification: NotificationService;
  // device: DeviceService;
  // userService: UserService;
  httpClient: HttpClient;
  storageService: StorageService;
  injector: Injector;
  service: BaseService;
  spinner: SpinnerService;
  // modal: ModalService;
  dialog: MatDialog;
  // helperService: HelperService
  allChecked = false;
  indeterminate = false;
  authService: AuthService;
  router: Router
  route: ActivatedRoute
  idUrl: number = 0;
  location: Location
  printSrc: any;
  pdfSrc: any;
  showDlgPreview = false;
  PATH_PDF = 'data:application/pdf;base64,';
  protected readonly DATE_RANGE = DATE_RANGE;
  selectedFile: File | null = null;
  dataImport: any;
  listDataDetail: any[] = [];
  imageDefaut = "assets/images/image-default.jpg";
  days: number[] = Array.from({length: 31}, (_, i) => i + 1);
  months: number[] = Array.from({length: 12}, (_, i) => i + 1);
  years: number[] = Array.from({length: 100}, (_, i) => new Date().getFullYear() - i);

  constructor(
    injector: Injector,
    service: BaseService
  ) {
    this.injector = injector;
    this.service = service
    this.spinner = this.injector.get(SpinnerService);
    // this.modal = this.injector.get(ModalService);
    this.httpClient = this.injector.get(HttpClient);
    this.storageService = this.injector.get(StorageService);
    // this.userService = this.injector.get(UserService);
    this.notification = this.injector.get(NotificationService);
    // this.device = this.injector.get(DeviceService);
    // this.helperService = this.injector.get(HelperService);
    // get user info login
    this.authService = this.injector.get(AuthService);
    // this.userInfo = this.authService.getUser();
    this.department = this.userInfo?.department;
    this.dialog = this.injector.get(MatDialog);
    this.router = this.injector.get(Router);
    this.route = this.injector.get(ActivatedRoute);
    this.location = this.injector.get(Location);
  }

  getDataSource() {
    this.dataSource.data = this.dataTable;
    return this.dataSource;
  }

  getId() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id && +id > 0) {
      this.idUrl = +id
    }
  }

  async searchPage() {
    try {
      const body = {
        ...this.formGroup.value,
        paggingReq: {limit: this.pageSize, page: this.page - 1}
      };
      const res = await this.service.searchPage(body);
      if (res?.status === STATUS_API.SUCCESS) {
        const {content, totalElements, totalPages} = res.data;
        this.dataTable = content;
        this.totalRecord = totalElements;
        this.totalPages = totalPages;
      } else {
        this.dataTable = [];
        this.totalRecord = 0;
      }
    } catch {
      this.notification.error(MESSAGE.ERROR, MESSAGE.SYSTEM_ERROR);
    } finally {
      await this.spinner.hide();
    }
  }

  async searchList() {
    try {
      const body = this.formGroup.value;
      const res = await this.service.searchList(body);
      if (res?.status === STATUS_API.SUCCESS) {
        this.dataTable = res.data || [];
        this.dataTable.forEach(item => item.checked = false);
      } else {
        this.dataTable = [];
        this.totalRecord = 0;
      }
    } catch {
      this.notification.error(MESSAGE.ERROR, MESSAGE.SYSTEM_ERROR);
    } finally {
      await this.spinner.hide();
    }
  }

  async save(body: any) {
    this.markFormGroupTouched(this.formGroup);
    if (this.formGroup.invalid) return;
    const res = await this.service.create(body);
    if (res?.status === STATUS_API.SUCCESS) {
      this.notification.success(MESSAGE.SUCCESS, MESSAGE.ADD_SUCCESS);
      return res.data;
    }
  }

  async update(body: any) {
    this.markFormGroupTouched(this.formGroup);
    if (this.formGroup.invalid) return;

    const res = await this.service.update(body);
    if (res?.status === STATUS_API.SUCCESS) {
      this.notification.success(MESSAGE.SUCCESS, MESSAGE.UPDATE_SUCCESS);
      return res.data;
    }
  }

  async markFormGroupTouched(formGroup: FormGroup, ignoreFields: string[] = []) {
    Object.keys(formGroup.controls).forEach(field => {
      if (formGroup.controls[field].enabled && !ignoreFields.includes(field)) {
        formGroup.controls[field].markAsDirty();
        formGroup.controls[field].updateValueAndValidity();
      }
    });
    this.findInvalidControls(formGroup);
  }

  findInvalidControls(formData: FormGroup) {
    const invalidControls = Object.keys(formData.controls).filter(name => formData.controls[name].invalid);
    if (invalidControls.length > 0) {
      this.notification.error(MESSAGE.ERROR, MESSAGE.FORM_REQUIRED_ERROR);
      console.log(invalidControls, 'invalid');
    }
  }

  async detail(id: number) {
    if (!id) return null;
    const res = await this.service.getDetail(id);
    return res?.status === STATUS_API.SUCCESS ? res.data : null;
  }

  clearFormData() {
    this.formGroup.reset();
  }
}
