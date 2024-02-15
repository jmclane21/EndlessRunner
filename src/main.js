/** Samurai Run by Jackson McLane
 *  Inspired by Samurai Blitz by Studio Thunderhorse
 *  Hours Spent on game: 22 hours(?) roughly
 *  Creative Tilt:
 *  As far as technically interesting, although hacky im pretty proud of how I got my "sword" hitbox working,
 *  the hitbox follows the player character and disappears when the player is not attacking, I would like to refactor
 *  the system to more elegantly use Phaser containers but for now I am proud that it is functional
 * 
 *  In terms of art style I am proud of the swing animation I made! I used references from the game I was inspired by
 *  to try and convey a sense of movement. I also used ChipTone to create sound effects that I quite like. 
 * 
 *  Another slight detail is that while the background does not actually have paralax, 
 *  the drawing I made fakes it by having varying sizes of trees :P
 * 
 *  Links to outside tools/assets:
 *  8-bit Game by moodmode
 *  https://pixabay.com/music/video-games-8-bit-game-158815/
 * 
 *  ChipTone by SFB Games
 *  https://sfbgames.itch.io/chiptone
 * 
 *  Samurai Blitz by Studio ThunderHorse
 *  https://thunderhorse.co/samurai-blitz/
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
let musicPlaying = false
