import Phaser from 'phaser'
import FlappyBirdConfig from './flappy-bird.config'

class BaseScene extends Phaser.Scene {
    protected config: any = null

    protected screenCenter: number[]
    protected fontSize: number
    protected lineHeight: number
    protected fontOptions: any

    // constructor(key, config) {
    constructor(key: string, config: any) {
        super(key)
        const lol = new FlappyBirdConfig()
        this.config = lol.getFlappyBirdConfig()
        this.fontSize = 34
        this.lineHeight = 42
        this.fontOptions = { fontSize: `${this.fontSize}px`, fill: '#fff' }
        this.screenCenter = [this.config.width / 2, this.config.height / 2]
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0)
        if (this.config.canGoBack) {
            const backButton = this.add
                .image(this.config.width - 10, this.config.height - 10, 'back')
                .setOrigin(1)
                .setScale(2)
                .setInteractive()

            backButton.on('pointerup', () => this.scene.start('MenuScene'))
        }
    }

    createMenu(menu: any, setupMenuEvents: any) {
        let menuPositionY = 0

        menu.forEach((menuItem: any) => {
            const menuPosition = [
                this.screenCenter[0],
                this.screenCenter[1] + menuPositionY,
            ]
            menuItem.textGO = this.add
                .text(
                    menuPosition[0],
                    menuPosition[1],
                    menuItem.text,
                    this.fontOptions
                )
                .setOrigin(0.5, 1)
            menuPositionY += this.lineHeight
            setupMenuEvents(menuItem)
        })
    }
}

export default BaseScene
