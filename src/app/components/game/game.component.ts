import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import Phaser from 'phaser';
import { Subscription } from 'rxjs';
import { LauncherService } from 'src/app/services/launcher.service';
import { DEFAULT_CONFIG } from './game.component.config';
import { FlappyBirdConfig } from 'src/app/games/flappy-bird/flappy-bird.config';
// TODO génériciser cette classe pour pouvoir en hériter
// Un GameXXComponent = 1 jeu
// = index.js du tuto ?
// Composant lancé par le routeur en fonction de la route

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnChanges, OnDestroy {
  @Input() config: any = null;
  defaultConfig: Phaser.Types.Core.GameConfig = DEFAULT_CONFIG;
  $newGame: boolean = false;
  phaserGame!: Phaser.Game;

  cursors: any;

  private gameSub: Subscription = new Subscription();
  private sceneSub: Subscription = new Subscription();

  constructor(private launcherService: LauncherService) {
    this.config = this.renewConfig();
  }
  ngOnInit(): void {
    this.launchNewGame();
    this.gameSub = this.launcherService.getLauncher().subscribe((res) => {
      if (res) {
        this.launchNewGame();
      }
    });
    this.sceneSub = this.launcherService.getNextScene().subscribe((res) => {
      if (res) {
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnDestroy() {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.sceneSub) {
      this.sceneSub.unsubscribe();
    }
  }

  launchNewGame(): void {
    this.renewConfig();
    if (this.phaserGame) {
      this.phaserGame.destroy(true, false);
    }
    console.log('Launching game', this.config);
    this.phaserGame = new Phaser.Game(this.config);
  }

  renewConfig(): Phaser.Types.Core.GameConfig {
    const MOCK_GAME_CONFIG = new FlappyBirdConfig();
    return (this.config = this.config
      ? this.config
      : MOCK_GAME_CONFIG.getFlappyBirdConfig());
  }

  // public initScene(scenes: any) {
  //   scenes.map((Scene: any) => {
  //     new Scene(this.config);
  //   });
  // }
}
