import BaseScene from './BaseScene'

const PIPES_TO_RENDER = 4
const VELOCITY = 200

class PlayScene extends BaseScene {
    private bird: any
    private pipes: any
    private isPaused: boolean
    private pauseEvent: any
    private pipeHorizontalDistance: number
    private flapVelocity: number
    private score: number
    private textScore: any
    private difficulty: string = ''
    private currentDifficulty: string
    private difficulties: any
    private initialTime: number = 3
    private countDownText: any
    private timedEvent: any

    constructor(config: any) {
        super('PlayScene', config)

        this.bird = null
        this.pipes = null
        this.isPaused = false

        this.pipeHorizontalDistance = 0
        this.flapVelocity = 300

        this.score = 0
        this.textScore = ''

        this.currentDifficulty = 'easy'
        this.difficulties = {
            easy: {
                pipeHorizontalDistanceRange: [300, 350],
                pipeVerticalDistanceRange: [150, 200],
            },
            medium: {
                pipeHorizontalDistanceRange: [280, 330],
                pipeVerticalDistanceRange: [140, 190],
            },
            hard: {
                pipeHorizontalDistanceRange: [250, 310],
                pipeVerticalDistanceRange: [120, 170],
            },
        }
    }

    override create() {
        this.difficulty = 'easy'
        super.create()
        this.createBird()
        this.createPipes()
        this.createColliders()
        this.createScore()
        this.createPause()
        this.handleInput()
        this.listenToEvents()

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('bird', {
                start: 8,
                end: 15,
            }),
            // 24 fps default
            frameRate: 8,
            // -1 = infinity
            repeat: -1,
        })
        this.bird.play('fly')
    }

    override update() {
        this.checkGameStatus()
        this.recyclePipes()
    }

    listenToEvents() {
        if (this.pauseEvent) {
            return
        }

        this.pauseEvent = this.events.on('resume', () => {
            this.initialTime = 3
            this.countDownText = this.add
                .text(
                    this.screenCenter[0],
                    this.screenCenter[1],
                    'Fly in ' + this.initialTime,
                    this.fontOptions
                )
                .setOrigin(0.5)
            this.timedEvent = this.time.addEvent({
                delay: 1000,
                callback: this.countDown,
                callbackScope: this,
                loop: true,
            })
        })
    }

    countDown() {
        this.initialTime--
        this.countDownText.setText('Fly in ' + this.initialTime)
        if (this.initialTime <= 0) {
            this.isPaused = false
            this.countDownText.setText('')
            this.physics.resume()
            this.timedEvent.remove()
        }
    }

    createBG() {
        // x, y, key
        this.add.image(0, 0, 'sky').setOrigin(0)
    }

    createBird() {
        this.bird = this.physics.add
            .sprite(
                this.config.startPosition.x,
                this.config.startPosition.y,
                'bird'
            )
            .setFlipX(true)
            .setScale(3)
            .setOrigin(0)

        this.bird.setBodySize(this.bird.width, this.bird.height - 8)

        this.bird.body.gravity.y = 400
        this.bird.setCollideWorldBounds(true)
    }

    createPipes() {
        this.pipes = this.physics.add.group()

        for (let i = 0; i < PIPES_TO_RENDER; i++) {
            const topPipe = this.pipes
                .create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0, 1)
            const downPipe = this.pipes
                .create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0)
            this.placePipe(topPipe, downPipe)
        }

        this.pipes.setVelocityX(-VELOCITY)
    }

    createColliders() {
        this.physics.add.collider(
            this.bird,
            this.pipes,
            this.gameOver,
            undefined,
            this
        )
    }

    createScore() {
        this.score = 0
        const bestScore = localStorage.getItem('bestScore')
        this.textScore = this.add.text(16, 16, `Score: ${0}`, {
            fontSize: '32px',
            stroke: '#000',
        })
        this.add.text(16, 52, `Best score ${bestScore || 0}`, {
            fontSize: '22px',
            stroke: '#000',
        })
    }

    createPause() {
        this.isPaused = false
        const pauseButton = this.add
            .image(this.config.width - 10, this.config.height - 10, 'pause')
            .setInteractive()
            .setScale(3)
            .setOrigin(1)

        pauseButton.on('pointerdown', () => {
            this.isPaused = true
            this.physics.pause()
            this.scene.pause()
            this.scene.launch('PauseScene')
        })
    }

    handleInput() {
        this.input.on('pointerdown', this.flap, this)
        this.input.keyboard.on('keydown_SPACE', this.flap, this)
    }

    checkGameStatus() {
        if (
            this.bird.getBounds().bottom >= this.config.height ||
            this.bird.y <= 0
        ) {
            this.gameOver()
        }
    }

    flap() {
        if (this.isPaused) {
            return
        }
        this.bird.body.velocity.y = -this.flapVelocity
    }

    increaseScore() {
        this.score++
        this.textScore.setText(`Score: ${this.score}`)
    }

    placePipe(tPipe: any, dPipe: any) {
        const difficulty = this.difficulties[this.currentDifficulty]
        const rightMostX = this.getRightMostPipe()
        let pipeVerticalDistance = Phaser.Math.Between(
            difficulty.pipeVerticalDistanceRange[0],
            difficulty.pipeVerticalDistanceRange[1]
        )
        let topPipeYOnset = Phaser.Math.Between(
            30,
            this.config.height - pipeVerticalDistance - 30
        )
        let pipeHorizontalDistance = Phaser.Math.Between(
            difficulty.pipeHorizontalDistanceRange[0],
            difficulty.pipeHorizontalDistanceRange[1]
        )
        tPipe.x = rightMostX + pipeHorizontalDistance
        tPipe.y = topPipeYOnset

        dPipe.x = tPipe.x
        dPipe.y = tPipe.y + pipeVerticalDistance
    }

    getRightMostPipe() {
        let rightMostX = 0
        this.pipes
            .getChildren()
            .forEach((pipe: any) => (rightMostX = Math.max(pipe.x, rightMostX)))
        return rightMostX
    }

    recyclePipes() {
        const tempPipes: any[] = []
        this.pipes.getChildren().forEach((pipe: any) => {
            if (pipe.getBounds().right <= 0) {
                tempPipes.push(pipe)
                if (tempPipes.length === 2) {
                    this.placePipe(tempPipes[0], tempPipes[1])
                    this.increaseScore()
                    this.saveBestScore()
                    this.checkDifficulty()
                }
            }
        })
    }

    checkDifficulty() {
        if (this.score === 3) {
            this.currentDifficulty = 'medium'
        }
        if (this.score === 5) {
            this.currentDifficulty = 'hard'
        }
    }

    saveBestScore() {
        const bestScoreText = localStorage.getItem('bestScore')
        const bestScore = bestScoreText && parseInt(bestScoreText, 10)

        if (!bestScore || this.score > bestScore) {
            localStorage.setItem('bestScore', this.score.toString())
        }
    }

    gameOver() {
        // this.bird.x = this.config.startPosition.x;
        // this.bird.y = this.config.startPosition.y;
        // this.bird.body.velocity.y = 0;
        // this.pipeHorizontalDistance = 0;
        this.physics.pause()
        this.bird.setTint(0xff0000)

        this.saveBestScore()

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.restart()
            },
            loop: false,
        })
    }
}

export default PlayScene
