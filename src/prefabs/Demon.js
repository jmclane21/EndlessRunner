class Demon extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.points = pointValue
        this.moveSpeed = 200
    }

    update(){
        //move demon left
        this.body.velocity.x = -this.moveSpeed

        //wrap from left to right edge
        if(this.x <= 0 - this.width){
            this.x = game.config.width + 100
        }
    }

    reset(){
        //when it resets, increase speed/difficulty by random amount
        this.moveSpeed += Math.random()*10
        this.x = game.config.width + 100
        this.body.checkCollision = true
    }
}