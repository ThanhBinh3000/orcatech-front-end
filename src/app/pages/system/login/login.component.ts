import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TitleService} from '../../../services/shared/title.service';
import {AuthService} from '../../../services/security/auth.service';
import {Router} from '@angular/router';
import {ComponentsModule} from '../../../component/base/components.module';
import {RegisterComponent} from '../register/register.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  title = 'Log in';
  public formGroup: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private titleService: TitleService,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private dialog: MatDialog
  ) {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'login-bg');
    this.authService.getLogout();
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'login-bg');
  }


  async getLogin() {
    if (!this.formGroup.valid) return;
    const res = await this.authService.getLogin(this.formGroup.value);
    if (res && res.status == 0) {
      this.authService.saveToken(res.data.token);
      const profile = await this.authService.profile();
      if (profile && profile.status == 0) {
        this.authService.saveUser(profile.data);
        if(profile.data.company){

          this.authService.saveCompany(profile.data.company);
        }
      }
      this.router.navigate(['']).then(async r => {});
    }
  }

  async openRegisterHangDialog(hangHoa: any) {
    const dialogRef = this.dialog.open(RegisterComponent, {
      data: hangHoa,
      width: '800px',
    });
  }
}
