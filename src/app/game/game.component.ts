import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainScene } from './scenes/main-scene';
import Phaser from 'phaser';
import { Subscription } from 'rxjs';
import { LauncherService } from './services/launcher.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  $newGame: boolean = false;
  phaserGame!: Phaser.Game;
  config: Phaser.Types.Core.GameConfig = {};
  cursors: any;

  private gameSub: Subscription = new Subscription();

  constructor(private launcherService: LauncherService) {}

  ngOnInit(): void {
    this.launchNewGame();
    this.gameSub = this.launcherService.getLauncher().subscribe((res) => {
      if (res) {
        this.launchNewGame();
      }
    });
  }

  ngOnDestroy() {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
  }

  launchNewGame(): void {
    this.renewConfig();
    if (this.phaserGame) {
      this.phaserGame.destroy(true, false);
    }
    this.phaserGame = new Phaser.Game(this.config);
  }

  renewConfig(): void {
    this.config = {
      type: Phaser.AUTO,
      scene: [MainScene],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.NONE,
        parent: 'gameContainer',
        width: 800,
        height: 600,
      },
    };
  }
}
