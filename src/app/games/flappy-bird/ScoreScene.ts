import BaseScene from './BaseScene'

class ScoreScene extends BaseScene {
    constructor(config: any) {
        super('ScoreScene', { ...config, canGoBack: true })
    }

    override create() {
        super.create()
        const text = localStorage.getItem('bestScore')
        this.add
            .text(
                this.screenCenter[0],
                this.screenCenter[1],
                `Best Score: ${text || 0} !  <3`,
                this.fontOptions
            )
            .setOrigin(0.5)
    }
}

export default ScoreScene
