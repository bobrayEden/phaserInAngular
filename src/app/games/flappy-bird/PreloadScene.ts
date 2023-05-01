import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
  constructor(config: any) {
    super('PreloadScene');
  }

  preload() {
    this.load.image('sky', 'assets/prototypes/sky.png');
    this.load.spritesheet('bird', 'assets/flappy-bird/birdSprite.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('pipe', 'assets/flappy-bird/pipe.png');
    this.load.image('pause', 'assets/flappy-bird/pause.png');
    this.load.image('back', 'assets/flappy-bird/back.png');
  }

  create() {
    this.scene.start('MenuScene');
  }
}

export default PreloadScene;
