import { LauncherService } from '../../services/launcher.service';

export class MainScene extends Phaser.Scene {
  constructor(private launcherService: LauncherService) {
    super({ key: 'main' });
  }

  create() {}

  preload() {}

  override update() {}
}
