import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/security/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit {
  public display: any = {};
  public lstNotification: any = [];
  public countNotification: any = 0;
  @Input() isLogin: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  mouseEnter(key: string, property: string) {
    this.display[key] = property;
  }

  mouseLeave(key: string, property: string) {
    this.display[key] = property;
    this.updateStatus();
  }

  isDisplay(key: string) {
    if (!this.display[key]) {
      return 'none';
    }
    return this.display[key];
  }

  getFullName() {
    return this.authService.getUser()?.fullName;
  }

  updateStatus() {

  }

  async openChangePasswordDialog() {

  }

  async navigateToLoginLogout() {
    await this.router.navigate(['/system/login']);
  }
}
