// triggered when STOP message is received
UTBBot.onMessageStopReceived(function () {
    myStopHandler()
})
function myDangerHandler () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Funeral), music.PlaybackMode.InBackground)
    debug(">Danger<")
    UTBBot.newBotStatus(UTBBotCode.BotStatus.ToShelter)
    basic.showIcon(IconNames.Skull)
}
// triggered when DANGER message is received
UTBBot.onMessageDangerReceived(function () {
    myDangerHandler()
})
/**
 * Just to be able to simulate, attach Start to button A and stop to loud sound or hurt
 */
input.onButtonPressed(Button.A, function () {
    myStartHandler()
})
function myStartHandler () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Funk), music.PlaybackMode.InBackground)
    debug(">Start<")
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
// CHANGE THIS CODE TO MATCH  YOUR MOTORS CONNECTIONS
// 
function setSpeed (speed: number) {
    amaker_motor.servoSpeed(amaker_motor.Servos.S5, speed)
    amaker_motor.servoSpeed(amaker_motor.Servos.S6, speed)
    amaker_motor.servoSpeed(amaker_motor.Servos.S7, speed)
    amaker_motor.servoSpeed(amaker_motor.Servos.S8, speed)
}
input.onSound(DetectedSound.Loud, function () {
    myStopHandler()
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
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
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
input.onGesture(Gesture.ThreeG, function () {
    myStopHandler()
})
UTBBot.onMessageStartReceived(function () {
    myStartHandler()
})
let receivedString = ""
let log_line = 0
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
