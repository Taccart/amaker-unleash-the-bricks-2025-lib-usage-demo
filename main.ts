// triggered when STOP message is received
UTBBot.onMessageStopReceived(function () {
    myStopHandler()
})
function setSpeeds (A: number, B: number, C: number, D: number) {
    amaker_motor.servoSpeed(amaker_motor.Servos.S5, A)
    amaker_motor.servoSpeed(amaker_motor.Servos.S6, B)
    amaker_motor.servoSpeed(amaker_motor.Servos.S7, C)
    amaker_motor.servoSpeed(amaker_motor.Servos.S8, D)
}
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    UTBRadio.incrementRadioGroup()
    basic.showString("" + (UTBRadio.getRadioGroup()))
})
function myDangerHandler () {
    debug(">Danger<")
    for (let index = 0; index < 4; index++) {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
    }
    UTBBot.newBotStatus(UTBBotCode.BotStatus.ToShelter)
    basic.showIcon(IconNames.Skull)
}
// triggered when DANGER message is received
UTBBot.onMessageDangerReceived(function () {
    myDangerHandler()
})
input.onButtonPressed(Button.A, function () {
    myStartHandler()
})
function myStartHandler () {
    debug(">Start<")
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
    setSpeed(20)
    UTBBot.newBotStatus(UTBBotCode.BotStatus.Search)
    basic.showLeds(`
        . . . . .
        . . # . .
        . # # # .
        # # # # #
        . . . . .
        `)
}
function debug (text: string) {
    console.debug(text)
}
function setSpeed (speed: number) {
    amaker_motor.servoSpeed(amaker_motor.Servos.S5, speed)
    amaker_motor.servoSpeed(amaker_motor.Servos.S6, speed)
    amaker_motor.servoSpeed(amaker_motor.Servos.S7, speed)
    amaker_motor.servoSpeed(amaker_motor.Servos.S8, speed)
}
input.onButtonPressed(Button.AB, function () {
    myStopHandler()
})
input.onButtonPressed(Button.B, function () {
    myDangerHandler()
})
function initializeLogToScreen () {
    function log_to_screen(priority: ConsolePriority, msg: string) {
    huskylens.writeOSD(msg, 0, log_line * 20)
    log_line = log_line + 1
    if (log_line == 19) { log_line = 1 }
}
huskylens.clearOSD;
console.addListener(log_to_screen)
}
function myStopHandler () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.InBackground)
    setSpeed(0)
    debug(">Stop<")
    UTBBot.newBotStatus(UTBBotCode.BotStatus.Idle)
    basic.showLeds(`
        . . . . .
        . # # # .
        . # # # .
        . # # # .
        . . . . .
        `)
}
UTBBot.onMessageStartReceived(function () {
    myStartHandler()
})
let log_line = 0
let receivedString = ""
music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.InBackground)
basic.showLeds(`
    . . . . .
    . # . # .
    . . . . .
    . # . # .
    . . . . .
    `)
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
basic.showLeds(`
    # . # . #
    . . . . .
    # . # . #
    . . . . .
    # . # . #
    `)
UTBBot.initAsBot(UTBBotCode.TeamName.RequiemForABot)
basic.showString("" + (UTBRadio.getRadioGroup()))
UTBBot.newBotStatus(UTBBotCode.BotStatus.Idle)
initializeLogToScreen()
basic.showLeds(`
    # . # . #
    . # . # .
    # . # . #
    . # . # .
    # . # . #
    `)
basic.forever(function () {
	
})
control.inBackground(function () {
    debug("<status>")
    UTBBot.emitStatus()
    basic.pause(5000)
})
