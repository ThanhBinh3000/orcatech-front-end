import {Component, OnInit} from '@angular/core';
import {ComponentsModule} from '../../component/base/components.module';
import {AuthService} from '../../services/security/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public company: any;
  public companyName: string = '';
  public display: any = {};

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {
    this.company = authService.getCompany();
    if (this.company) {
      this.companyName = this.company.name;
    }
  }

  ngOnInit(): void {
  }

  mouseEnter(key: string, property: string) {
    this.display[key] = property;
  }

  mouseLeave(key: string, property: string) {
    this.display[key] = property;
  }

  isDisplay(key: string) {
    if (!this.display[key]) {
      return 'none';
    }
    return this.display[key];
  }

  isLogin() {
    return this.authService.isLogin();
  }

  async navigateToHome() {
    await this.router.navigate(['/']);
  }
}
