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
    firstPath.moveTo(new paper.Point(0, 150));
    firstPath.lineTo(new paper.Point(250, 150));

    //second line
    let secondPath = new paper.Path();
    secondPath.strokeColor = 'white';
    secondPath.moveTo(new paper.Point(0, 350));
    secondPath.lineTo(new paper.Point(250, 350));

    console.log(currentPictureWidth);
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

    let startBiprizm = new paper.Point(250, 150);

    path.moveTo(startBiprizm);
    path.lineTo(startBiprizm.add([0, 200]));
    path.lineTo(startBiprizm.add([50, 100]));
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

$(document).ready(function () {
    drawBiprizmSchema();
});