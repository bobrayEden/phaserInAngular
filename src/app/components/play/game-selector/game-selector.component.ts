import { Component, EventEmitter, Output } from '@angular/core'
import { GAME_TITLES_DROPDOWN } from './game-selector.config'

@Component({
    selector: 'app-game-selector',
    templateUrl: './game-selector.component.html',
    styleUrls: ['./game-selector.component.scss'],
})
export class GameSelectorComponent {
    @Output() selectedGameOutput = new EventEmitter<any>()
    public selectorContent: any[] = GAME_TITLES_DROPDOWN
    public selectedGame: any = GAME_TITLES_DROPDOWN[0]

    loadNewGame() {
        this.selectedGameOutput.emit(this.selectedGame)
    }
}
