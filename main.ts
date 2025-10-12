// triggered when STOP message is received
UTBBot.onMessageStopReceived(function () {
    myStopHandler()
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    UTBRadio.incrementRadioGroup()
    UTBRadio.showRadioGroup()
})
function myDangerHandler () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
    basic.showIcon(IconNames.Skull)
    UTBBot.emitAcknowledgement(UTBBotCode.IntercomType.DANGER)
    UTBBot.newBotStatus(UTBBotCode.BotStatus.TO_SAFETY)
}
// triggered when DANGER message is received
UTBBot.onMessageDangerReceived(function () {
    myDangerHandler()
})
input.onButtonPressed(Button.A, function () {
    UTBRadio.emitLog("" + UTBBot.incrementCollectedBallsCount(1))
})
function myStartHandler () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
    basic.showLeds(`
        . # . . .
        . # # . .
        . # # # .
        . # # . .
        . # . . .
        `)
    UTBBot.emitAcknowledgement(UTBBotCode.IntercomType.START)
    UTBBot.newBotStatus(UTBBotCode.BotStatus.SEARCHING)
}
input.onButtonPressed(Button.AB, function () {
    UTBBotCode.resetCollectCount()
})
input.onButtonPressed(Button.B, function () {
	
})
function myStopHandler () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.InBackground)
    basic.showLeds(`
        # # . # #
        # # . # #
        # # . # #
        # # . # #
        # # . # #
        `)
    UTBBot.emitAcknowledgement(UTBBotCode.IntercomType.STOP)
    UTBBot.newBotStatus(UTBBotCode.BotStatus.STOPPED)
}
UTBBot.onMessageStartReceived(function () {
    myStartHandler()
})
basic.showLeds(`
    . . . . .
    . # . # .
    . # . # .
    . # . # .
    . . . . .
    `)
UTBBot.initAsBot(UTBBotCode.TeamName.TeslaCybertruck)
UTBBot.newBotStatus(UTBBotCode.BotStatus.WAITING)
UTBRadio.showRadioGroup()
loops.everyInterval(1000, function () {
    UTBBot.emitHeartBeat()
})
loops.everyInterval(5000, function () {
    UTBBot.emitStatus()
})
