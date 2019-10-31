

//  Initialize the Phaser Game object 
const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
})

// Shared variables

var footboard
var sandBoxes
var coins
var goblin

var score = 0
var scoreCounter
var keyboardButton 

// Phaser Functions (preload, create and update)

function preload() {

    // World
    game.load.image('cave', 'asts/cave.png')
    game.load.image('ground','/asts/plat.png')
    game.load.spritesheet('rocks','asts/rocks.png',32,32)
    game.load.spritesheet('sand','asts/sand.png',32,32)

    // Objects
    game.load.image('coin','asts/coin.png')

    // Players
    game.load.spritesheet('goblin','asts/gobwalk.png',30,32)

}

function create() {

    // Adding arcade physics system
    game.physics.startSystem(Phaser.Physics.ARCADE)

    game.add.sprite(0, 0, 'cave')

    // GROUND, ROOF, PLATAFORMS AND BOXES 

    footboard = game.add.group() 
    footboard.enableBody = true

    sandBoxes = game.add.group() 
    sandBoxes.enableBody = true

    // Ground and Roof

    let ground = footboard.create(0, game.world.height - 37, 'ground')
    ground.scale.setTo(2, 2)
    ground.body.immovable = true 

    let roof = footboard.create(0, 15, 'ground')
    roof.scale.setTo(2, -2)
    roof.body.immovable = true 

    // Plataforms 

    // plataform 1

    let plataform = footboard.create(400, 500, 'rocks')
    plataform.body.immovable = true 
    plataform.frame = 0

    plataform = footboard.create(432, 500, 'rocks')
    plataform.body.immovable = true 
    plataform.frame = 1

    plataform = footboard.create(464, 500, 'rocks')
    plataform.body.immovable = true 
    plataform.frame = 1

    plataform = footboard.create(496, 500, 'rocks')
    plataform.body.immovable = true 
    plataform.frame = 1
    
    plataform = footboard.create(528, 500, 'rocks')
    plataform.body.immovable = true 
    plataform.frame = 2

    // plataform 2 

    plataform = footboard.create(564, 450, 'rocks')
    plataform.body.immovable = true 
    plataform.frame = 0

    plataform = footboard.create(596, 450, 'rocks')
    plataform.body.immovable = true 
    plataform.frame = 1
    
    plataform = footboard.create(628, 450, 'rocks')
    plataform.body.immovable = true 
    plataform.frame = 2

    // plataform 3 

    plataform = footboard.create(660, 500, 'rocks')
    plataform.body.immovable = true 
    plataform.frame = 3

    // plataform 3 

    plataform = footboard.create(770, 350, 'rocks')
    plataform.body.immovable = true 
    plataform.frame = 3

    // plataform 4 (sand box)

    let sand  = sandBoxes.create(670, 390, 'sand')
    sand.body.immovable = true 
    sand.frame = 3

    sand.animations.add('falling', [3, 4, 5, 6, 7], 10, false)

    // THE GOBLIN (PLAYER)

    goblin = game.add.sprite(12, game.world.height - 100, 'goblin')
    goblin.scale.setTo(1.5,1.5)

    game.physics.arcade.enable(goblin)

    goblin.body.bounce.y = 0.2
    goblin.body.gravity.y = 800
    goblin.body.collideWorldBounds = true

    goblin.animations.add('walkingLeft', [1, 2, 0, 1], 10, true)
    goblin.animations.add('walkingRight', [4, 5, 3, 4], 10, true)

    // OBJECTS 

    // coins

    coins = game.add.group()
    coins.enableBody = true

    coin = coins.create(400,400,'coin')
    coin.body.gravity.y = 300
    coin.body.bounce.y = 0.7

    coin = coins.create(600,400,'coin')
    coin.body.gravity.y = 300
    coin.body.bounce.y = 0.7

    coin = coins.create(700,400,'coin')
    coin.body.gravity.y = 300
    coin.body.bounce.y = 0.7

    coin = coins.create(770, 315,'coin')
    coin.body.gravity.y = 300
    coin.body.bounce.y = 0.7

    // CONTROLS 
    keyboardButton = game.input.keyboard.createCursorKeys()

    // SCORE 
    scoreCounter  = game.add.text(10,18, 'Coins: 0', {fontSize: '43px', fill: '#ffff'})

    // TIMER 

    timer = game.time.create(false)
    timer.start()

}

function update() {

    goblin.body.velocity.x = 0 

    game.physics.arcade.collide(goblin, footboard)
    game.physics.arcade.collide(coins, footboard)

    // Colecting coins 

    game.physics.arcade.overlap(goblin, coins, getCoins)

    // Jumping over the sand boxes 

    game.physics.arcade.collide(goblin, sandBoxes, makeTheSandFall)

    // Making the Goblin Walk

    if (keyboardButton.left.isDown) {

        goblin.body.velocity.x = -150
        goblin.animations.play('walkingLeft', true)

    } else if (keyboardButton.right.isDown) {

        goblin.body.velocity.x = 150
        goblin.animations.play('walkingRight', true)

    } else {

        goblin.animations.stop()

    }

    // Making the Goblin Jump

    // Only can jump if its touching the ground
    if (keyboardButton.up.isDown && goblin.body.touching.down) {
        goblin.body.velocity.y = -360
    }

}

// Interaction Functions (my functions)

function getCoins (goblin, coin) {

    coin.kill()

    score += 1
    scoreCounter.text = 'Coins: ' + score

    console.log(score)

}

function makeTheSandFall(goblin, sandBox) {

    sandBox.animations.play('falling', true)

    game.time.events.add(400, function () {
        sandBox.body.velocity.y = 360
        game.time.events.add(400, function () {
            sandBox.kill()
        });
    });

}



