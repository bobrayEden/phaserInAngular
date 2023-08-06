import { Component } from '@angular/core'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'phaser-test'
    public config: any

    constructor() {}

    launchNewGame($event: any) {
        this.config = $event.value.config
    }
}
