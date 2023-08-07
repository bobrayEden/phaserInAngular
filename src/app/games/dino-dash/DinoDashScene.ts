export class DinoDashScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DinoDash' })
    }

    preload() {
        this.load.image('sky', 'assets/prototypes/sky.png')
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0)
    }

    override update() {}
}
