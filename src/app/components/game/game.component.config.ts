import { LogoScene } from 'src/app/games/prototypes/logo-scene'

export const DEFAULT_CONFIG = {
    type: Phaser.AUTO,
    scene: [LogoScene],
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
}
