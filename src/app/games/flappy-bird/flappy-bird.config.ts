import MenuScene from './MenuScene';
import PauseScene from './PauseScene';
import PlayScene from './PlayScene';
import PreloadScene from './PreloadScene';
import ScoreScene from './ScoreScene';

export const FLAPPY_BIRD_SCENES = [
  PreloadScene,
  MenuScene,
  ScoreScene,
  PlayScene,
  PauseScene,
];

export const FLAPPY_BIRD_CONFIG = {
  type: Phaser.AUTO,
  scene: FLAPPY_BIRD_SCENES,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.NONE,
    parent: 'gameContainer',
  },
};

export const FLAPPY_BIRD_SHARED_PARAMETERS = {
  width: 400,
  height: 600,
  startPosition: { x: 400 * 0.1, y: 600 / 2 },
};

export class FlappyBirdConfig {
  private flappyBirdConfig: any = null;

  public getFlappyBirdConfig(): any {
    if (!this.flappyBirdConfig) {
      this.flappyBirdConfig = {
        ...FLAPPY_BIRD_CONFIG,
        ...FLAPPY_BIRD_SHARED_PARAMETERS,
        scenes: FLAPPY_BIRD_SCENES.map(
          () => new Phaser.Scene(FLAPPY_BIRD_SHARED_PARAMETERS.toString())
        ),
      };
    }
    return this.flappyBirdConfig;
  }

  constructor() {
    this.flappyBirdConfig = this.getFlappyBirdConfig();
  }
}
export default FlappyBirdConfig;
