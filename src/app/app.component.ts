import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'phaser-test';

  newGameCount: BehaviorSubject<number> = new BehaviorSubject(0);

  launchNewGame() {
    this.newGameCount.next(1);
  }
}
