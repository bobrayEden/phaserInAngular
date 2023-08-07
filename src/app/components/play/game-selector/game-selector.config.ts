import { DINODASH } from 'src/app/games/dino-dash/dino-dash.config'
import { FLAPPYBIRD } from 'src/app/games/flappy-bird/flappy-bird.config'
import { DEFAULT_CONFIG } from '../game/game.component.config'

export const GAME_TITLES_DROPDOWN = [
    {
        name: 'Default',
        value: DEFAULT_CONFIG,
    },
    {
        name: 'Flappy Bird',
        value: FLAPPYBIRD,
    },
    {
        name: 'Dino Dash',
        value: DINODASH,
    },
]
