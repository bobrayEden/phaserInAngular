import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
    public config: any

    constructor() {}

    ngOnInit() {}
    launchNewGame($event: any) {
        this.config = $event.value.config
    }
}
