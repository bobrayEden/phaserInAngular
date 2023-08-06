import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import Phaser from 'phaser'
import { Config, DEFAULT_CONFIG } from './game.component.config'

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnChanges {
    @Input() config: any
    defaultConfig: Config = DEFAULT_CONFIG
    phaserGame!: Phaser.Game

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['config']) {
            this.launchNewGame()
        }
    }

    launchNewGame(): void {
        if (this.phaserGame) {
            this.phaserGame.destroy(true, false)
        }
        this.launchGame()
    }

    launchGame() {
        if (!this.config) {
            this.config = this.defaultConfig.config
        }
        this.phaserGame = new Phaser.Game(this.config)
    }
}
