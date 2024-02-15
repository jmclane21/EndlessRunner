class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }

    create(){
        let backgroundMusic = this.sound.add('background_music')
        backgroundMusic.loop = true
        if(!musicPlaying){
            backgroundMusic.play()
            musicPlaying = true
        }
        
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
        this.add.text(game.config.width/2, game.config.height/2 - 90, 'Samurai Run', 
        menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use Spacebar to jump & (J) to strike\nPress button to start\nTAB for Credits', menuConfig).
        setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'

        let keyboardInput = this.input.keyboard
        let keycode = Phaser.Input.Keyboard.KeyCodes
        keySPACE = keyboardInput.addKey(keycode.SPACE)
        keyJ = keyboardInput.addKey(keycode.J)
        keyTAB = keyboardInput.addKey(keycode.TAB)

        this.anims.create({
            key: 'run',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNames('samurai_atlas', {
                prefix: 'walk',
                start: 0,
                end: 3
            })
        })

        this.anims.create({
            key: 'attack',
            frameRate: 15,
            frames: this.anims.generateFrameNumbers('samurai_atlas', { frames: [
                'attack0', 'attack1', 'attack2', 'attack2', 'attack1', 'attack0'] }),
        })
    }

    preload(){
        this.load.image('forest', './assets/forest.png')
        this.load.atlas('samurai_atlas', './assets/samurai_atlas.png', './assets/samurai_atlas.json')
        this.load.image('grass', './assets/grass.png')
        this.load.image('demon', './assets/demon.png')
        this.load.audio('hurt', './assets/hit.wav')
        this.load.audio('menu_select', './assets/menu_select.wav')
        this.load.audio('demon_death','./assets/demon_death.wav')
        this.load.audio('sword_swing', './assets/sword_swing.wav')
        this.load.audio('background_music', './assets/8-bit-game_music.mp3')
    }

    update(){
        this.forest.tilePositionX += 1
        if(Phaser.Input.Keyboard.JustDown(keyJ) || Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.sound.play('menu_select')
            this.scene.start('playScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyTAB)){
            this.sound.play('menu_select')
            this.scene.start('creditsScene')
        }
    }
}