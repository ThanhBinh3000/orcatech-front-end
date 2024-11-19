import {Component, ElementRef, Injector, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {
  FormGroup,
  Validators
} from '@angular/forms';
import {passwordValidator} from '../../../validators/password.validator';
import {emailValidator} from '../../../validators/email.validator';
import {phoneNumberValidator} from '../../../validators/phone-number.validator';
import {UserProfileService} from '../../../services/system/userProfile.service';
import {TitleService} from '../../../services/shared/title.service';
import {BaseComponent} from '../../../component/base/base.component';
import {ComponentsModule} from '../../../component/base/components.module';
import {RegionsService} from '../../../services/categories/regions.service';
import {CitiesService} from '../../../services/categories/cities.service';
import {WardsService} from '../../../services/categories/wards.service';
import {MESSAGE, STATUS_API} from '../../../constants/message';
import {ProvincesService} from '../../../services/categories/provinces.service';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends BaseComponent implements OnInit, OnDestroy{
  title = "Register";
  isPasswordHidden = true;
  isConfirmPasswordHidden = true;
  listRegions: any[] = [];
  listProvinces: any[] = [];
  listCities: any[] = [];
  listWards: any[] = [];
  checkbox: boolean = false;

  constructor(
    injector: Injector,
    private titleService: TitleService,
    private _service: UserProfileService,
    private regionsService: RegionsService,
    private provincesService: ProvincesService,
    private citiesService: CitiesService,
    private wardsService: WardsService,
    private renderer: Renderer2,
    private el: ElementRef,
    private datePipe: DatePipe,
  ) {
    super(injector, _service);
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required, passwordValidator],
      confirmPassword: ['', Validators.required],
      fullName: ['', Validators.required],
      selectedDay: [null, Validators.required],
      selectedMonth: [null, Validators.required],
      selectedYear: [null, Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required, emailValidator],
      phoneNumber: ['', Validators.required, phoneNumberValidator],
      citizenIdNumber: ['', Validators.required],
      regionId: [null, Validators.required],
      provinceId: [null, Validators.required],
      cityId: [null, Validators.required],
      wardId: [null, Validators.required],
      addresses: ['', Validators.required],
      zipCode: ['', Validators.required],
      rememberMe: [false],
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(fg: FormGroup) {
    const newPassword = fg.get('password')?.value ?? '';
    const confirmPassword = fg.get('confirmPassword')?.value ?? '';
    return newPassword === confirmPassword ? null : {mismatchPassword: true};
  }

  async ngOnInit() {
    this.titleService.setTitle(this.title);
    this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'login-bg');
    await this.getListRegions();
    await this.getListProvinces(this.formGroup.get('regionId')?.value);
    await this.getListCities(this.formGroup.get('provinceId')?.value);
    await this.getlistWards(this.formGroup.get('cityId')?.value);
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'login-bg');
  }

  async getListRegions() {
    const res = await this.regionsService.searchList({});
    if (res?.status === STATUS_API.SUCCESS) {
      this.listRegions = res.data;
    }
  }

  async changeRegions($event: any) {
    this.formGroup.patchValue({provinceId: null, cityId: null, wardId: null});
    if ($event) await this.getListProvinces($event.id);
  }

  async getListProvinces(regionId: any) {
    if (regionId && regionId > 0) {
      const res = await this.provincesService.searchList({
        regionId: regionId
      });
      if (res?.status === STATUS_API.SUCCESS) {
        this.listProvinces = res.data;
      }
    }
  }

  async changeProvinces($event: any) {
    this.formGroup.patchValue({cityId: null, wardId: null});
    if ($event) await this.getListCities($event.id);
  }

  async getListCities(provinceId: any) {
    if (provinceId && provinceId > 0) {
      const res = await this.citiesService.searchList({
        provinceId: provinceId,
      });
      if (res?.status === STATUS_API.SUCCESS) {
        this.listCities = res.data;
      }
    }
  }

  async changeCities($event: any) {
    this.formGroup.patchValue({wardId: null});
    if ($event) await this.getlistWards($event.id);
  }

  async getlistWards(cityId: any) {
    if (cityId && cityId > 0) {
      const res = await this.wardsService.searchList({
        cityId: cityId,
      });
      if (res?.status === STATUS_API.SUCCESS) {
        this.listWards = res.data;
      }
    }
  }

  async calculateBirthDate() {
    const day = this.formGroup.get('selectedDay')?.value;
    const month = this.formGroup.get('selectedMonth')?.value;
    const year = this.formGroup.get('selectedYear')?.value;
    if (day && month && year) {
      const birthDate = new Date(Date.UTC(year, month - 1, day));
      const formattedDate = this.datePipe.transform(birthDate, 'dd/MM/yyyy HH:mm:ss') ?? '';
      this.formGroup.get('birthDate')?.setValue(formattedDate);
    }
  }

  changeCheckBox(event: Event): void {
    const check = event.target as HTMLInputElement;
    this.checkbox = check.checked;
  }

  async register() {
    await this.calculateBirthDate()
    this.markFormGroupTouched(this.formGroup);
    if (this.formGroup.invalid) return;
    const res = await this.service.create(this.formGroup.value);
    if (res?.status === STATUS_API.SUCCESS) {
      this.notification.success(MESSAGE.SUCCESS, MESSAGE.CREATE_ACCOUNT_SUCCESS);
      return res.data;
    }
  }
}
