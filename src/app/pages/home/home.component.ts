import {Component, ElementRef, Injector, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {BaseComponent} from '../../component/base/base.component';
import {AuthService} from '../../services/security/auth.service';
import {TitleService} from '../../services/shared/title.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  title = 'Home';

}
