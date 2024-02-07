joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.down, function () {
    Bird.change(LedSpriteProperty.Y, 1)
})
input.onButtonPressed(Button.A, function () {
    Bird.change(LedSpriteProperty.Y, -1)
})
input.onButtonPressed(Button.B, function () {
    Bird.change(LedSpriteProperty.Y, 1)
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.down, function () {
    Bird.change(LedSpriteProperty.Y, -1)
})
let emptyObstacleY = 0
let Bird: game.LedSprite = null
let Milliseconds = 1000
game.setScore(0)
let ticks = 0
let obstacle: game.LedSprite[] = []
Bird = game.createSprite(0, 2)
Bird.set(LedSpriteProperty.Blink, 300)
joystickbit.initJoystickBit()
joystickbit.Vibration_Motor(50)
music.setVolume(127)
music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.UntilDone)
music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Ode), music.PlaybackMode.LoopingInBackground)
music.setVolume(31)
basic.forever(function () {
    while (obstacle.length > 0 && obstacle[0].get(LedSpriteProperty.X) == 0) {
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
            music.stopAllSounds()
            joystickbit.Vibration_Motor(500)
            music.setVolume(127)
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Funeral), music.PlaybackMode.InBackground)
            game.gameOver()
        }
    }
    game.setScore(Math.floor(ticks / 3 - 1))
    ticks += 1
    basic.pause(Milliseconds)
    if (Milliseconds > 10) {
        Milliseconds += -1
    }
})
