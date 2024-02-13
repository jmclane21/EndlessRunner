class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    create(){
        //make background
        this.forest = this.add.tileSprite(0,0,640,480, 'forest').setOrigin(0,0)

        //add floor
        this.floor = this.physics.add.sprite(0, game.config.height, 'grass').setScale(1, 1.4).setOrigin(0,1)
        this.floor.body.setImmovable()
        this.floor.body.allowGravity = false
        //add player obj
        this.samurai = new Samurai(this, 32, game.config.height - 150, 'samurai').setOrigin(0,0).setScale(2.5)

        //add enemy objs

        //init collision handling
        this.physics.add.collider(this.floor, this.samurai)
        
        //Define input
        let keyboardInput = this.input.keyboard
        let keycode = Phaser.Input.Keyboard.KeyCodes
        keySPACE = keyboardInput.addKey(keycode.SPACE)
        keyJ = keyboardInput.addKey(keycode.J)

        //init score
        this.score = 0

        //gameover flag
        this.gameover = false
    }

    update(){
        this.forest.tilePositionX += 5

        if(!this.gameover){
            this.samurai.update()
        }
    }
}