import { Config } from 'src/app/components/play/game/game.component.config'
import { DinoDashScene } from './DinoDashScene'

export const DINO_DASH_SCENES = [DinoDashScene]

export const DINO_DASH_CONFIG = {
    type: Phaser.AUTO,
    scene: DINO_DASH_SCENES,
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
        width: 800,
        height: 600,
    },
}

export const DINODASH_SHARED_PARAMETERS = {
    // startPosition: { x: 400 * 0.1, y: 600 / 2 },
}

export class DinoDashConfig {
    private config: any = null

    public getDinodashConfig(): any {
        if (!this.config) {
            this.config = {
                ...DINO_DASH_CONFIG,
                scenes: DINO_DASH_SCENES.map(() => {
                    return new Phaser.Scene(
                        DINODASH_SHARED_PARAMETERS.toString()
                    )
                }),
            }
        }
        return this.config
    }

    constructor() {
        this.config = this.getDinodashConfig()
    }
}
export default DinoDashConfig

export const DINODASH: Config = {
    config: new DinoDashConfig().getDinodashConfig(),
}
