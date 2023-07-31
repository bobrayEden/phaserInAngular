import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { GameComponent } from './components/game/game.component'
import { GameSelectorComponent } from './components/game-selector/game-selector.component'
import { FormsModule } from '@angular/forms'

@NgModule({
    declarations: [AppComponent, GameComponent, GameSelectorComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
