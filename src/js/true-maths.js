let currentA;
let currentB;
let currentLambda;
let currentTeta;
let currentN;

$(document).ready(function () {
    paper.setup(document.getElementById("screen"));

    currentA = Number($('#a-input').val());
    currentB = Number($('#b-input').val());
    currentLambda = Number($('#lambda-input').val());
    currentTeta = radians(Number($('#teta-input').val()));
    currentN = Number($('#n-input').val());

    $('#a-input').on('input', function () {
        currentA = Number($(this).val());
        drawScreen();
    });

    $('#b-input').on('input', function () {
        currentB = Number($(this).val());
        drawScreen();
    });

    $('#n-input').on('input', function () {
        currentN = Number($(this).val());
        drawScreen();
    });

    $('#teta-input').on('input', function () {
        currentTeta = radians(Number($(this).val()));
        drawScreen();
    });

    $('#lambda-input').on('input', function () {
        currentLambda = Number($(this).val());
        drawScreen();
    });

    drawScreen();
});

function radians(teta) {
    return 0.00174533 * teta * 10;
}

function drawScreen() {
    paper.project.clear();

    let pictureWidth = pictureWidthFunction(currentB, currentTeta, currentN);
    let oneLineWidth = oneLineWidthFunction(currentA, currentB, currentLambda, currentTeta, currentN);

    console.log(pictureWidth + " - pictureWith");
    console.log(oneLineWidth + " - oneLineWith");

    let hueLambda = hueLambdaFunction(currentLambda);
    let colors = getColors(oneLineWidth, hueLambda);

    let point = new paper.Point({
        x: 200,
        y: 0
    });

    createLeftRectangle(oneLineWidth, point, colors);
    createRightRectangle(oneLineWidth, point, colors);
    // let rectangleRight = new paper.Path.Rectangle({
    //     topLeft: point,
    //     size: {
    //         width: oneLineWidth / 2,
    //         height: 500
    //     },
    //     fillColor: {
    //         origin: point,
    //         destination: point.add({ x: oneLineWidth / 2, y: 0}),
    //         gradient: {
    //             stops: colors,
    //             radial: false
    //         }
    //     }
    // });
    // let rectangleLeft = new paper.Path.Rectangle({
    //     topRight: point,
    //     size: {
    //         width: oneLineWidth / 2,
    //         height: 500
    //     },
    //     fillColor: {
    //         origin: point,
    //         destination: point.add({ x: -oneLineWidth / 2, y: 0}),
    //         gradient: {
    //             stops: colors,
    //             radial: false
    //         }
    //     }
    // });
    paper.view.draw();
}

function getColors(oneLineWidth, hueLambda) {
    let colors = [];
    for (let x = 0; x < oneLineWidth; x+= oneLineWidth / 100) {
        colors.push({
            hue: hueLambda,
            saturation: 1,
            brightness: brightnessWidth(oneLineWidth, x)
        });
    }

    return colors;
}

function createLeftRectangle(oneLineWidth, point, colors) {
    new paper.Path.Rectangle({
        topLeft: point,
        size: {
            width: oneLineWidth / 2,
            height: 500
        },
        fillColor: {
            origin: point,
            destination: point.add({
                x: oneLineWidth / 2,
                y: 0
            }),
            gradient: {
                stops: colors,
                radial: false
            }
        }
    });
}

function createRightRectangle(oneLineWidth, point, colors) {
    new paper.Path.Rectangle({
        topLeft: point,
        size: {
            width: oneLineWidth / 2,
            height: 500
        },
        fillColor: {
            origin: point,
            destination: point.add({
                x: -oneLineWidth / 2,
                y: 0
            }),
            gradient: {
                stops: colors,
                radial: false
            }
        }
    });
}

function oneLineWidthFunction(a, b, lambda, teta, n) {
    return (a + b) * lambda * (1e-9) / (2 * a * teta * (n - 1));
}

function pictureWidthFunction(b, teta, n) {
    return 2 * b * teta * (n - 1);
}

function hueLambdaFunction(lambda) {
    //красный 0 - 30
    if (lambda >= 630) {
        return 0.2 * (780 - lambda);
    }

    //оранжевый 30 - 50
    if (lambda < 630 && lambda >= 590) {
        return 30 + 0.5 * (630 - lambda);
    }

    //желтый 50 - 70
    if (lambda < 590 && lambda >= 570) {
        return 50 + (590 - lambda);
    }

    //желто-зеленый 70 - 90
    if (lambda < 570 && lambda >= 550) {
        return 70 + (570 - lambda);
    }

    //зеленый 90 - 150
    if (lambda < 550 && lambda >= 510) {
        return 90 + 1.5 * (550 - lambda);
    }

    //голубой 150 - 200
    if (lambda < 510 && lambda >= 480) {
        return 150 + 5/3 * (550 - lambda);
    }

    //синий 200 - 250
    if (lambda < 480 && lambda >= 450) {
        return 200 + 5/3 * (480 - lambda);
    }

    //фиолетовый 250 - 280
    //lambda 450 - 380
    return 250 + 3/7 * (450 - lambda);
}

// width of interferencionniy line
// x - from 0 to 1 width
function brightnessWidth(width, x) {
    let x_percent = x / width * 100;

    return x_percent > 40 ? 0.01 * (100 - (x_percent - 40)) : 1;
}
