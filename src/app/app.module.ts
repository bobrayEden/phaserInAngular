import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { GameComponent } from './components/play/game/game.component'
import { PlayComponent } from './components/play/play.component'
import { GameSelectorComponent } from './components/play/game-selector/game-selector.component'
import { FormsModule } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        GameSelectorComponent,
        PlayComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        DropdownModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
