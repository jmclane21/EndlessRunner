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
        this.samurai = new Samurai(this, 32, game.config.height - 150, 'samurai', 0).setOrigin(0,0).setScale(2)

        //add enemy objs
        this.demon1 = new Demon(this, 400, 400, 'demon', 0, 100).setScale(2)
        this.demon1.body.allowGravity = false

        this.demon2 = new Demon(this, 400, 300, 'demon', 0, 100).setScale(2)
        this.demon2.body.allowGravity = false

        this.demon3 = new Demon(this, 400, 200, 'demon', 0, 100).setScale(2)
        this.demon3.body.allowGravity = false

        //enemy group
        this.enemies = this.add.group([this.demon1, this.demon2, this.demon3])

        //init collision handling
        this.physics.add.collider(this.floor, this.samurai)
        this.physics.add.overlap(this.samurai.hitbox, this.enemies, this.hitEnemy, null, this)
        this.physics.add.overlap(this.samurai, this.enemies, this.hitSamurai, null, this)
        
        //Define input
        let keyboardInput = this.input.keyboard
        let keycode = Phaser.Input.Keyboard.KeyCodes
        keySPACE = keyboardInput.addKey(keycode.SPACE)
        keyJ = keyboardInput.addKey(keycode.J)
        keyRESET = keyboardInput.addKey(keycode.R)
        keyTAB = keyboardInput.addKey(keycode.TAB)

        //init score
        this.score = 0

        //display score
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '26px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.scoreLeft = this.add.text(0, 0, 'Score: 0',
            this.scoreConfig)

        //display health
        let healthConfig = {
            fontFamily: 'Courier',
            fontSize: '26px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.healthText = this.add.text(game.config.width, 0, 'HP: '+ this.samurai.hitPoints,
             healthConfig).setOrigin(1,0)

        //gameover flag
        this.gameover = false
    }

    update(){
        
        if(!this.gameover){
            this.forest.tilePositionX += 5
            this.samurai.update()
            this.demon1.update()
            this.demon2.update()
            this.demon3.update()
        }
        else{
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',
            this.scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or Tab for Credits',
            this.scoreConfig).setOrigin(0.5)
            this.demon1.body.velocity.x = 0
            if(Phaser.Input.Keyboard.JustDown(keyRESET)){
                this.scene.restart()
            }
            if(Phaser.Input.Keyboard.JustDown(keyTAB)){
                this.scene.start('creditsScene')
            }
        }
    }

    hitEnemy(hitbox, demon){
        demon.reset()
        this.score += demon.points
        this.scoreLeft.text = 'Score:' + this.score
        demon.moveSpeed += 10
    }

    hitSamurai(samurai, demon){
        demon.reset()
        samurai.hitPoints--
        this.healthText.text = 'HP: ' + samurai.hitPoints
        if(samurai.hitPoints == 0){
            this.gameover = true
        }
        samurai.setTint('0xDE0000')
        samurai.on('animationcomplete', () => {
            samurai.clearTint()
        })
        
    }
}