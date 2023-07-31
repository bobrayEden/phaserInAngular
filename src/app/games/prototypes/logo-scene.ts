export class LogoScene extends Phaser.Scene {
    constructor() {
        super({ key: 'logo' })
    }

    preload() {
        this.load.image('sky', 'assets/prototypes/sky.png')
    }

    create() {
        console.log(this)
        this.add.image(0, 0, 'sky').setOrigin(0)
    }

    override update() {
        console.log('enter update')
    }
}
