class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }

    create(){
        this.forest = this.add.tileSprite(0,0,640,480, 'forest').setOrigin(0,0)

        let menuConfig = {
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

        //display menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Samurai Run', 
        menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use Spacebar to jump & (J) to strike\nPress button to start', menuConfig).
        setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'

        let keyboardInput = this.input.keyboard
        let keycode = Phaser.Input.Keyboard.KeyCodes
        keySPACE = keyboardInput.addKey(keycode.SPACE)
        keyJ = keyboardInput.addKey(keycode.J)

        this.anims.create({
            key: 'run',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('samurai', { start: 0, end: 3 }),
        })

        this.anims.create({
            key: 'attack',
            frameRate: 15,
            frames: this.anims.generateFrameNumbers('samurai', { frames: [4, 5, 6, 6, 5, 4] }),
        })
    }

    preload(){
        this.load.image('forest', './assets/forest.png')
        this.load.spritesheet('samurai', './assets/samurai.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.image('grass', './assets/grass.png')
        this.load.image('demon', './assets/demon.png')
    }

    update(){
        this.forest.tilePositionX += 1
        if(Phaser.Input.Keyboard.JustDown(keyJ) || Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('playScene')
        }
    }
}