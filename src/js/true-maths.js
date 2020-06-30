let currentA;
let currentB;
let currentLambda;
let currentTeta;
let currentN;

$(document).ready(function () {
    currentA = Number($('#a-input').val());
    currentB = Number($('#b-input').val());
    currentLambda = Number($('#lambda-input').val());
    currentTeta = Number($('#teta-input').val());
    currentN = Number($('#n-input').val());

    $('#a-input').change(function () {
        currentA = Number($(this).val());
    });

    $('#b-input').change(function () {
        currentB = Number($(this).val());
    });

    $('#n-input').change(function () {
        currentN = Number($(this).val());
    });

    $('#teta-input').change(function () {
        currentTeta = Number($(this).val());
    });

    $('#lambda-input').change(function () {
        currentLambda = Number($(this).val());
    });

    paper.setup(document.getElementById("screen"));

    let oneLineWidth = oneLineWidthFunction(currentA, currentB, currentLambda, currentTeta, currentN);
    let hueLambda = hueLambdaFunction(currentLambda);

    console.log(oneLineWidth + " + " + hueLambda);

    let colors = [];
    for (let x = 0; x < oneLineWidth; x+= oneLineWidth / 100) {
        colors.push({
            hue: hueLambda,
            saturation: 1,
            brightness: brightnessWidth(oneLineWidth, x)
            // brightness: 1
        });
    }

    console.log(colors);

    let point = new paper.Point({
        x: 100,
        y: 0
    });
    let rectangleRight = new paper.Path.Rectangle({
        topLeft: point,
        size: {
            width: oneLineWidth / 2,
            height: 500
        },
        fillColor: {
            origin: point,
            destination: point.add({ x: oneLineWidth / 2, y: 0}),
            gradient: {
                stops: colors,
                radial: false
            }
        }
    });
    let rectangleLeft = new paper.Path.Rectangle({
        topRight: point,
        size: {
            width: oneLineWidth / 2,
            height: 500
        },
        fillColor: {
            origin: point,
            destination: point.add({ x: -oneLineWidth / 2, y: 0}),
            gradient: {
                stops: colors,
                radial: false
            }
        }
    });
    paper.view.draw();
});

function oneLineWidthFunction(a, b, lambda, teta, n) {
    return (a + b) * lambda / (2 * a * teta * (n - 1));
}

function pictureWidth(b, teta, n) {
    return 2 * b * teta * (n - 1);
}

function hueLambdaFunction(lambda) {
    return 0.7 * (780 - lambda);
}

// width of interferencionniy line
// x - from 0 to 0.5 width
function brightnessWidth(width, x) {
    let x_percent = x / width * 100;

    return x_percent > 60 ? 0.01 * (100 - (x_percent - 60)) : 1;
}
