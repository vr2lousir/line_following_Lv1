let IRstate = 0
function IRreading () {
    if (CUHK_JC_iCar.Line_Sensor(CUHK_JC_iCar.enPos.Left, CUHK_JC_iCar.enLineState.WhiteLine) && CUHK_JC_iCar.Line_Sensor(CUHK_JC_iCar.enPos.Right, CUHK_JC_iCar.enLineState.WhiteLine)) {
        IRstate = 11
        basic.showLeds(`
            # . . . #
            # . . . #
            # . . . #
            # . . . #
            # . . . #
            `)
    } else if (CUHK_JC_iCar.Line_Sensor(CUHK_JC_iCar.enPos.Left, CUHK_JC_iCar.enLineState.WhiteLine) && CUHK_JC_iCar.Line_Sensor(CUHK_JC_iCar.enPos.Right, CUHK_JC_iCar.enLineState.BlackLine)) {
        IRstate = 10
        basic.showLeds(`
            . . . . #
            . . . . #
            . . . . #
            . . . . #
            . . . . #
            `)
    } else if (CUHK_JC_iCar.Line_Sensor(CUHK_JC_iCar.enPos.Left, CUHK_JC_iCar.enLineState.BlackLine) && CUHK_JC_iCar.Line_Sensor(CUHK_JC_iCar.enPos.Right, CUHK_JC_iCar.enLineState.WhiteLine)) {
        IRstate = 1
        basic.showLeds(`
            # . . . .
            # . . . .
            # . . . .
            # . . . .
            # . . . .
            `)
    } else {
        IRstate = 0
        basic.showLeds(`
            . . . . .
            . . . . .
            # # # # #
            . . . . .
            . . . . .
            `)
    }
}
function wheelAction (state: number) {
    if (state == 0) {
        CUHK_JC_iCar.carCtrlSpeed(CUHK_JC_iCar.CarState.Forward, 30)
    } else if (state == 1) {
        CUHK_JC_iCar.carCtrlSpeed(CUHK_JC_iCar.CarState.TurnLeft, 30)
    } else if (state == 10) {
        CUHK_JC_iCar.carCtrlSpeed(CUHK_JC_iCar.CarState.TurnRight, 30)
    } else {
        CUHK_JC_iCar.carCtrlSpeed(CUHK_JC_iCar.CarState.Backward, 30)
    }
}
basic.forever(function () {
    IRreading()
    wheelAction(IRstate)
})
