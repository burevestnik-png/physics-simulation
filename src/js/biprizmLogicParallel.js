function drawBiprizmSchema() {
    paper.setup(document.getElementById("biprizm"));

    drawBlackBackground();
    drawBiprizm();
    let screenPosition = drawSimulationScreen();
    drawLines(screenPosition);

    paper.view.draw();
}

function drawLines(screenPosition) {
    //central path
    let path = new paper.Path();
    path.strokeColor = 'white';
    path.dashArray = [15, 17];

    let startPath = new paper.Point(300, 250);

    path.moveTo(startPath);
    path.lineTo(new paper.Point(1000, 250));

    let nextPath = new paper.Path();
    nextPath.strokeColor = 'white';

    nextPath.moveTo(new paper.Point(0, 250));
    nextPath.lineTo(new paper.Point(300, 250));

    //first line
    let firstPath = new paper.Path();
    firstPath.strokeColor = 'white';
    firstPath.moveTo(new paper.Point(0, 250 - currentA * 100 * 170 / 2));
    firstPath.lineTo(new paper.Point(250,  250 - currentA * 100 * 170 / 2));

    //second line
    let secondPath = new paper.Path();
    secondPath.strokeColor = 'white';
    secondPath.moveTo(new paper.Point(0, 250 + currentA * 100 * 170 / 2));
    secondPath.lineTo(new paper.Point(250, 250 + currentA * 100 * 170 / 2));

    let additionalFirstPath = new paper.Path();
    // additionalFirstPath.dashArray = [10, 12];
    additionalFirstPath.strokeColor = 'white';
    additionalFirstPath.moveTo(new paper.Point(0, 250 - currentA * 100 * 170 / 4));
    additionalFirstPath.lineTo(new paper.Point(275, 250 - currentA * 100 * 170 / 4));

    let additionalSecondPath = new paper.Path();
    // additionalSecondPath.dashArray = [10, 12];
    additionalSecondPath.strokeColor = 'white';
    additionalSecondPath.moveTo(new paper.Point(0, 250 + currentA * 100 * 170 / 4));
    additionalSecondPath.lineTo(new paper.Point(275, 250 + currentA * 100 * 170 / 4));

    //third line
    let thirdPath = new paper.Path();
    thirdPath.strokeColor = 'white';
    thirdPath.moveTo(new paper.Point(250, 250 - currentA * 100 * 170 / 2));
    thirdPath.lineTo(new paper.Point(currentRombLength * 200 + 300, 250));

    let additionalThirdPath = new paper.Path();
    // additionalThirdPath.dashArray = [10, 12];
    additionalThirdPath.strokeColor = 'white';
    additionalThirdPath.moveTo(new paper.Point(275, 250 - currentA * 100 * 170 / 4));
    additionalThirdPath.lineTo(new paper.Point(600 + 300, 170 * currentA * (1 / (4 * currentRombLength + 1) * 600 - 275 / (4 * currentRombLength + 1) + 25) + 240));
    // additionalThirdPath.lineTo(new paper.Point(currentRombLength * 200 / 2 + 300, 250));

    //fourth line
    let fourthPath = new paper.Path();
    fourthPath.strokeColor = 'white';
    fourthPath.moveTo(new paper.Point(250, 250 + currentA * 100 * 170 / 2));
    fourthPath.lineTo(new paper.Point(currentRombLength * 200 + 300, 250));

    let additionalFourthPath = new paper.Path();
    // additionalFourthPath.dashArray = [10, 12];
    additionalFourthPath.strokeColor = 'white';
    additionalFourthPath.moveTo(new paper.Point(275, 250 + currentA * 100 * 170 / 4));
    additionalFourthPath.lineTo(new paper.Point(600 + 300, 250 - ((170 * currentA * (1 / (4 * currentRombLength + 1) * 600 - 275 / (4 * currentRombLength + 1) + 25) + 240) - 250)));

    //fifth line
    let fifthPath = new paper.Path();
    fifthPath.strokeColor = 'white';
    fifthPath.moveTo(new paper.Point(300, 250));
    fifthPath.lineTo(new paper.Point(currentRombLength * 200 / 2 + 300, 250 - currentRombHeight * 17000 + 6));

    //sixth line
    let sixthPath = new paper.Path();
    sixthPath.strokeColor = 'white';
    sixthPath.moveTo(new paper.Point(300, 250));
    sixthPath.lineTo(new paper.Point(currentRombLength * 200 / 2 + 300, 250 + currentRombHeight * 17000 - 6));
}

function drawBlackBackground() {
    new paper.Path.Rectangle({
        topLeft: {
            x:0,
            y:0
        },
        size: {
            width: 1000,
            height: 500
        },
        fillColor: '0x000000'
    });
}

function drawBiprizm() {
    let path = new paper.Path();
    path.strokeColor = 'white';

    let startBiprizm = new paper.Point(250, 250 - currentA * 100 * 170 / 2);

    path.moveTo(startBiprizm);
    path.lineTo(startBiprizm.add([0, currentA * 100 * 170]));
    path.lineTo(startBiprizm.add([50,  currentA * 100 * 170 / 2]));
    path.lineTo(startBiprizm.add([0, 0]));
}

function drawSimulationScreen() {
    let path = new paper.Path();
    path.strokeColor = 'white';
    path.dashArray = [10, 14];

    let calculatedX = (currentB - 0.5) * 200 + 400;
    let startScreen = new paper.Point(calculatedX, 30);

    path.moveTo(startScreen);
    path.lineTo(startScreen.add([0, 440]));

    return calculatedX;
}