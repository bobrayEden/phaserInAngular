import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LauncherService {
  public $newGame: BehaviorSubject<number> = new BehaviorSubject(0);

  launchNewGame() {
    return this.$newGame.next(1);
  }

  getLauncher() {
    return this.$newGame;
  }

  public $nextScene: BehaviorSubject<string> = new BehaviorSubject('');

  setNextScene(sceneName: string) {
    return this.$nextScene.next(sceneName);
  }

  getNextScene() {
    return this.$nextScene;
  }
}
