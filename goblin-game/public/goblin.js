//  Initialize the Phaser Game object 
const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
})

// Global variables

var footboard
var coins
var goblin

var score = 0
var scoreCounter
var keyboardButton 

// Phaser Functions

function preload() {
    game.load.image('cave', 'asts/cave.png')
    game.load.image('ground','/asts/plat.png')
    game.load.image('coin','asts/coin.png')
    game.load.spritesheet('goblin','asts/gobwalk.png',30,32)
}

function create() {

    // Adding arcade physics system
    game.physics.startSystem(Phaser.Physics.ARCADE)

    game.add.sprite(0, 0, 'cave')

    // GROUND AND PLATAFORMS 

    footboard = game.add.group() 
    footboard.enableBody = true

    let ground = footboard.create(0, game.world.height - 37, 'ground')
    ground.scale.setTo(2, 2)
    ground.body.immovable = true 

    let roof = footboard.create(0, 15, 'ground')
    roof.scale.setTo(2, -2)
    roof.body.immovable = true 

    // THE GOBLIN (PLAYER)

    goblin = game.add.sprite(12, game.world.height - 100, 'goblin')
    goblin.scale.setTo(1.5,1.5)

    game.physics.arcade.enable(goblin)

    goblin.body.bounce.y = 0.2
    goblin.body.gravity.y = 800
    goblin.body.collideWorldBounds = true

    goblin.animations.add('walkingLeft', [1, 2, 0], 10, true)
    goblin.animations.add('walkingRight', [4, 5, 3], 10, true)

    // OBJECTS 

    // coins

    coins = game.add.group()
    coins.enableBody = true

    coin = coins.create(400,400,'coin')

    coin.body.gravity.y = 1000
    coin.body.bounce.y = 0.7

    // CONTROLS 
    keyboardButton = game.input.keyboard.createCursorKeys()

    // SCORE 
    scoreCounter  = game.add.text(10,570, 'Score: ', {fontSize: '43px', fill: '#ffff'})

}

function update() {

    goblin.body.velocity.x = 0 

    game.physics.arcade.collide(goblin, footboard)
    game.physics.arcade.collide(coins, footboard)

    // Making the Goblin Walk

    if (keyboardButton.left.isDown) {

        goblin.body.velocity.x = -150
        goblin.animations.play('walkingLeft')

    } else if (keyboardButton.right.isDown) {

        goblin.body.velocity.x = 150
        goblin.animations.play('walkingRight')

    } else {

        goblin.animations.stop()

    }

    // Making the Goblin Jump

    // Only can jump if its touching the ground
    if (keyboardButton.up.isDown && goblin.body.touching.down) {
        goblin.body.velocity.y = -400
    }

    game.physics.arcade.overlap(goblin, coin, getCoins, null, this)


}

// Functions Interaction

function getCoins (goblin, coin) {
    coin.kill()

    score += 10
    scoreCounter.text = 'Score: ' + score
}