import { Component } from '@angular/core';
import { ATMTrackingService } from './services/ATM-Tracking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ATM';
  constructor(private atmService: ATMTrackingService) {
    this.atmService.buildATMInv();
  }
}
