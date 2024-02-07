input.onButtonPressed(Button.A, function () {
    Bird.change(LedSpriteProperty.Y, -1)
})
input.onButtonPressed(Button.B, function () {
    let sprite: game.LedSprite = null
    sprite.change(LedSpriteProperty.Y, 1)
})
let emptyObstacleY = 0
let Bird: game.LedSprite = null
let ticks = 0
let obstacle: game.LedSprite[] = []
Bird = game.createSprite(0, 2)
Bird.set(LedSpriteProperty.Blink, 300)
basic.forever(function () {
    while (obstacle.length > 0 && obstacle[0] == 0) {
        obstacle.removeAt(0).delete()
    }
    for (let obstacle2 of obstacle) {
        obstacle2.change(LedSpriteProperty.X, -1)
    }
    if (ticks % 3 == 0) {
        emptyObstacleY = randint(0, 4)
        for (let index = 0; index <= 4; index++) {
            if (index != emptyObstacleY) {
                obstacle.push(game.createSprite(4, index))
            }
        }
    }
    for (let obstacle3 of obstacle) {
        if (obstacle3.get(LedSpriteProperty.X) == Bird.get(LedSpriteProperty.X) && obstacle3.get(LedSpriteProperty.Y) == Bird.get(LedSpriteProperty.Y)) {
            game.gameOver()
        }
    }
    ticks += 1
    basic.pause(1000)
})
