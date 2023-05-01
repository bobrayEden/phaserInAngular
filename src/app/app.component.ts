import { Component } from '@angular/core';
import { LauncherService } from './services/launcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'phaser-test';

  constructor(private launcherService: LauncherService) {}

  launchNewGame() {
    this.launcherService.launchNewGame();
  }
}
