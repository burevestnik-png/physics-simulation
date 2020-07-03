function drawBiprizmSchema() {
    paper.setup(document.getElementById("biprizm"));

    drawBlackBackground();
    drawBiprizm();
    let screenPosition = drawSimulationScreen();
    drawSourcePoints();
    drawDashedCentralPath();
    drawLines(screenPosition);

    paper.view.draw();
}

function drawLines(screenPosition) {
    let firstHeight = (screenPosition - 300) / 4;

    //first line
    let firstPath = new paper.Path();
    firstPath.strokeColor = 'white';

    let firstAdditionalPath = new paper.Path();
    firstAdditionalPath.strokeColor = 'white';
    firstAdditionalPath.dashArray = [5, 12];

    let firstStart = new paper.Point(50, 315);
    firstAdditionalPath.moveTo(firstStart);
    firstAdditionalPath.lineTo(new paper.Point(300, 250));

    firstPath.moveTo(new paper.Point(300, 250));
    firstPath.lineTo(new paper.Point(screenPosition, 250 - firstHeight));

    // second line
    let secondPath = new paper.Path();
    secondPath.strokeColor = 'white';

    let secondAdditionalPath = new paper.Path();
    secondAdditionalPath.strokeColor = 'white';
    secondAdditionalPath.dashArray = [5, 12];

    let secondStart = new paper.Point(50, 185);
    secondAdditionalPath.moveTo(secondStart);
    secondAdditionalPath.lineTo(new paper.Point(300, 250));

    secondPath.moveTo(new paper.Point(300, 250));
    secondPath.lineTo(new paper.Point(screenPosition, 250 + firstHeight));

    //third line
    let thirdPath = new paper.Path();
    thirdPath.strokeColor = 'white';
    thirdPath.moveTo(new paper.Point(50, 250));
    thirdPath.lineTo(new paper.Point(250, 150));
    thirdPath.lineTo(new paper.Point(screenPosition, 185 -  135 * screenPosition / 850));

    //fourth line
    let fourthPath = new paper.Path();
    fourthPath.strokeColor = 'white';
    fourthPath.moveTo(new paper.Point(50, 250));
    fourthPath.lineTo(new paper.Point(250, 350));
    fourthPath.lineTo(new paper.Point(screenPosition, 315 +  135 * screenPosition / 850));

    //fifth line
    let fifthpath = new paper.Path();
    fifthpath.strokeColor = 'white';
    fifthpath.moveTo(new paper.Point(50, 185));
    fifthpath.lineTo(new paper.Point(250, 150));
    fifthpath.dashArray = [5, 12];

    //sixth line
    let sixthPath = new paper.Path();
    sixthPath.strokeColor = 'white';
    sixthPath.moveTo(new paper.Point(50, 315));
    sixthPath.lineTo(new paper.Point(250, 350));
    sixthPath.dashArray = [5, 12];

    //seventh line
    let seventhPath = new paper.Path();
    seventhPath.strokeColor = 'white';
    seventhPath.moveTo(new paper.Point(screenPosition, 30));
    seventhPath.lineTo(new paper.Point(screenPosition, 250 - firstHeight));

    //eighth path
    let eighthPath = new paper.Path();
    eighthPath.strokeColor = 'white';
    eighthPath.moveTo(new paper.Point(screenPosition, 250 + firstHeight));
    eighthPath.lineTo(new paper.Point(screenPosition, 470));

    //ninth path
    let ninthPath = new paper.Path();
    ninthPath.strokeColor = 'white';
    ninthPath.moveTo(new paper.Point(50, 250));
    ninthPath.lineTo(new paper.Point(250, 200));
    ninthPath.lineTo(new paper.Point(273, 197));
    ninthPath.lineTo(new paper.Point(screenPosition, 197));

    //tenth path
    let tenthPath = new paper.Path();
    tenthPath.strokeColor = 'white';
    tenthPath.moveTo(new paper.Point(50, 250));
    tenthPath.lineTo(new paper.Point(250, 300));
    tenthPath.lineTo(new paper.Point(273, 303));
    tenthPath.lineTo(new paper.Point(screenPosition, 303));
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

function drawSourcePoints() {
    let sPoint = new paper.Path.Circle(new paper.Point(50, 250), 3);
    sPoint.fillColor = 'white';

    let sFirstPoint = new paper.Path.Circle(new paper.Point(50, 185), 3);
    sFirstPoint.fillColor = 'white';

    let sSecondaryPoint = new paper.Path.Circle(new paper.Point(50, 315), 3);
    sSecondaryPoint.fillColor = 'white';
}

function drawDashedCentralPath() {
    let path = new paper.Path();
    path.strokeColor = 'white';
    path.dashArray = [15, 17];

    let startPath = new paper.Point(0, 250);

    path.moveTo(startPath);
    path.lineTo(startPath.add([1000, 0]));
}

$(document).ready(function () {
    drawBiprizmSchema();
});