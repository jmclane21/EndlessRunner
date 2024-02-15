class Credits extends Phaser.Scene{
    constructor(){
        super('creditsScene')
    }

    create(){
        this.forest = this.add.tileSprite(0,0,640,480, 'forest').setOrigin(0,0)
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, this.game.config.height/2,
            `Made by Jackson McLane\nSoundFX from ChipTone\nMusic from\nInspired by\n Samurai Blitz by Studio ThunderHorse\nPress TAB to exit to Start`,
            scoreConfig).setOrigin(.5)

        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB)
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyTAB)){
            this.scene.start('menuScene')
        }

        this.forest.tilePositionX += 1
    }
}