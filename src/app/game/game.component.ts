import { Component, OnInit } from '@angular/core';
import  Phaser  from 'phaser'

class NewScene extends Phaser.Scene {

  constructor() {
    super({ key: 'new' });
  }

  preload() {
    console.log('enter preload');
  }

  create() {
    console.log('enter create');
  }
}


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  phaserGame!: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      scene: [ MainScene ],
      physics: {
        default: 'arcade',
      },
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'gameContainer',
        width: 800,
        height: 600
      }
    };
  }

  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
}

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  
  create() {
    console.log('create method');
  }

  preload() {
    console.log('preload method');
  }

  override update() {
    console.log('update method');
  }
}
