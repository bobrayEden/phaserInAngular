import { Component, OnInit } from '@angular/core'
import { GAME_TITLES_DROPDOWN } from './game-selector.config'
import { DEFAULT_CONFIG } from '../game/game.component.config'

@Component({
    selector: 'app-game-selector',
    templateUrl: './game-selector.component.html',
    styleUrls: ['./game-selector.component.scss'],
})
export class GameSelectorComponent implements OnInit {
    DEFAULT_CONFIG = DEFAULT_CONFIG
    selectorContent: any[] = GAME_TITLES_DROPDOWN
    selectedGame: any

    constructor() {}

    ngOnInit() {
        console.log('lol', this.selectorContent)
    }

    lol($event: any) {
        console.log('lol method', JSON.stringify($event.target.value))

        this.selectedGame = $event.target.value
    }
}
