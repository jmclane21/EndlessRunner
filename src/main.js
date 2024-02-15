/** Samurai Run by Jackson McLane
 *  Inspired by Samurai Blitz by Studio Thunderhorse
 */

let config  = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 2600},
            debug: true
        },
    },
    scene: [ Menu, Play, Credits ]
}

let game = new Phaser.Game(config);
//reserved keyboard bindings
let keySPACE, keyJ, keyRESET, keyTAB

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3