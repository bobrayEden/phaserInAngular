export class NewScene extends Phaser.Scene {
  constructor() {
    super({ key: 'new' });
  }

  preload() {
    console.log('enter preload');
  }

  create() {
    console.log('enter create');
  }

  override update() {
    console.log('enter update');
  }
}
