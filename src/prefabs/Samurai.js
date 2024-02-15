class Samurai extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.hitPoints = 3
        this.isJumping = false
        this.isAttacking = false
        this.MAX_JUMPS = 2
        this.jumps = 2
        //hitbox for swings
        this.hitbox = scene.physics.add.sprite(-100, -100, '').setAlpha(0)
        this.hitbox.setOrigin(0,0)
        this.hitbox.body.setSize((this.width*2),this.height*2)
        this.hitbox.body.allowGravity = false
    }

    update(){
        if(this.isAttacking){
            this.hitbox.setPosition(this.x+this.width, this.y+20)
        }
        //check attacking
        if(!this.isAttacking && Phaser.Input.Keyboard.JustDown(keyJ)){
            this.hitbox.setPosition(this.x+this.width, this.y+20)
            this.anims.play('attack', true)
            this.isAttacking = true
            this.once('animationcomplete', () => {
                this.hitbox.setPosition(-100,-100)
                this.isAttacking = false
                this.anims.play('run', true)
            })
        }

        if(!this.isAttacking){
            this.anims.play('run', true)
        }

        //check if grounded to check if they can jump/double jump
        this.isGrounded = this.body.touching.down
        if(this.isGrounded){
            this.jumps = this.MAX_JUMPS
            this.isJumping = false
        }

        // allow steady velocity change up to a certain key down duration, taken from Prof. Nathan's MovementStudies
        // https://github.com/nathanaltice/MovementStudies/blob/master/scenes/VariableJump.js
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	    if(this.jumps > 1 &&  Phaser.Input.Keyboard.DownDuration(keySPACE, 150)) {
	        this.body.velocity.y = -900
	        this.isJumping = true
	    }
        //double jumps don't go as high!
        else if(this.jumps > 0 &&  Phaser.Input.Keyboard.DownDuration(keySPACE, 150)) {
	        this.body.velocity.y = -600
	        this.isJumping = true
	    }
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if(this.isJumping && Phaser.Input.Keyboard.UpDuration(keySPACE, 100)) {
	    	this.jumps--
	    	this.isJumping = false
	    }

    }
}