import { LogoScene } from 'src/app/games/prototypes/logo-scene'

export interface Config {
    config: Phaser.Types.Core.GameConfig
}

export const DEFAULT_CONFIG: Config = {
    config: {
        type: Phaser.AUTO,
        scene: [LogoScene],
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false,
            },
        },
        scale: {
            mode: Phaser.Scale.NONE,
            parent: 'gameContainer',
            width: 800,
            height: 600,
        },
    },
}
