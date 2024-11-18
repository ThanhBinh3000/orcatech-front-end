import {RouterModule, RouterOutlet} from '@angular/router';
import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {SpinnerService} from "./services/shared/spinner.service";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'OrcaTech';

  constructor(
    public loadingService: SpinnerService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit() {
    this.loadingService.loading$.subscribe((value) => {
      this.cdRef.detectChanges();
    });
  }
}
