const SCREEN_WIDTH = $(document).width() * 0.8;
const SCREEN_HEIGHT = 300;

let currentA;
let currentB;
let currentLambda;
let currentTeta;
let currentN;

let defaultA;
let defaultB;
let defaultLambda;
let defaultTeta;
let defaultN;

let currentRombLength;
let currentRombHeight;

$(document).ready(function () {
    //перевод из см в м
    currentA = 0.01 * Number($('#a-input').val());
    currentB = Number($('#b-input').val());
    currentLambda = Number($('#lambda-input').val());
    defaultTeta = Number($('#teta-input').val());
    currentTeta = radians(Number($('#teta-input').val()));
    currentN = Number($('#n-input').val());

    defaultA = currentA * 100;
    defaultB = currentB
    defaultLambda = currentLambda;
    defaultN = currentN;

    $('#a-label').text((currentA * 100).toFixed(1) + " см");
    $('#b-label').text(currentB + " м");
    $('#n-label').text(currentN);
    $('#lambda-label').text(currentLambda + " нм");
    $('#teta-label').text(Number($("#teta-input").val()) + " градусов");

    $('#a-input').on('input', function () {
        //перевод из см в м
        currentA = 0.01 * Number($(this).val());
        $('#a-label').text((currentA * 100).toFixed(1) + " см");
        drawScreen();
        drawBiprizmSchema();
    });

    $('#b-input').on('input', function () {
        currentB = Number($(this).val());
        $('#b-label').text(currentB + " м");
        drawScreen();
        drawBiprizmSchema();
    });

    $('#n-input').on('input', function () {
        currentN = Number($(this).val());
        $('#n-label').text(currentN);
        drawScreen();
        drawBiprizmSchema();
    });

    $('#teta-input').on('input', function () {
        currentTeta = radians(Number($(this).val()));
        $('#teta-label').text(Number($(this).val()) + " градусов");
        drawScreen();
        drawBiprizmSchema();
    });

    $('#lambda-input').on('input', function () {
        currentLambda = Number($(this).val());
        $('#lambda-label').text(currentLambda + " нм");
        drawScreen();
        drawBiprizmSchema();
    });

    $('#reset').click(function () {
        currentN = defaultN;
        currentTeta = radians(defaultTeta);
        currentA = 0.01 * defaultA;
        currentB = defaultB;
        currentLambda = defaultLambda;

        $('#a-label').text(defaultA.toFixed(1) + " см");
        $('#b-label').text(defaultB + " м");
        $('#n-label').text(defaultN);
        $('#lambda-label').text(defaultLambda + " нм");
        $('#teta-label').text(defaultTeta + " градусов");

        $('#a-input').val(defaultA);
        $('#b-input').val(defaultB);
        $('#n-input').val(defaultN);
        $('#lambda-input').val(defaultLambda);
        $('#teta-input').val(defaultTeta);

        drawScreen();
        drawBiprizmSchema();
    });

    drawScreen();
    drawBiprizmSchema();
});

function radians(teta) {
    return 0.00174533 * teta * 10;
}

function drawScreen() {
    paper.setup(document.getElementById("screen"));
    paper.project.clear();

    printBlackScreen();

    let pictureWidth = pictureWidthFunction(currentA / 2, currentB, currentTeta, currentN);
    let oneLineWidth = oneLineWidthFunction(currentA / 2, currentB, currentLambda, currentTeta, currentN);
    let lineNumber = getLineNumber(pictureWidth, oneLineWidth);

    console.log("pictureWidth: " + pictureWidth);
    console.log("oneLineWidth: " + oneLineWidth);
    console.log("lineNumber: " + lineNumber);
    let hueLambda = hueLambdaFunction(currentLambda);
    let colors = getColors(oneLineWidth, hueLambda);

    let points = createPoints(pictureWidth, lineNumber, oneLineWidth);

    if (points.length === 1 || points.length === 2) {
        printWithoutSmooth(points, oneLineWidth, colors);
    } else if (points.length === 3 || points.length === 4) {
        printWithOneEndLineSmooth(points, oneLineWidth, colors);
    } else if (points.length === 5 || points.length === 6) {
        printWithTwoEndLineSmooth(points, oneLineWidth, colors);
    } else {
        printWithThreeEndLinesSmooth(points, oneLineWidth, colors);
    }

    paper.view.draw();
}

function printWithoutSmooth(points, oneLineWidth, colors) {
    points.forEach((point) => {
        printLine(point, oneLineWidth, colors);
    });
}

function printWithOneEndLineSmooth(points, oneLineWidth, colors) {
    for (let i = 0; i < points.length; i++) {
        if (i === 0 || i === points.length - 1) {
            let smoothColors = [];
            colors.forEach((color) => smoothColors.push({...color}));

            smoothColors.forEach((color) => color.brightness *= 0.4);
            printLine(points[i], oneLineWidth, smoothColors);
            continue;
        }

        printLine(points[i], oneLineWidth, colors);
    }
}

function printWithTwoEndLineSmooth(points, oneLineWidth, colors) {
    for (let i = 0; i < points.length; i++) {
        if (i === 0 || i === points.length - 1) {
            let smoothColors = [];
            colors.forEach((color) => smoothColors.push({...color}));

            smoothColors.forEach((color) => color.brightness *= 0.2);
            printLine(points[i], oneLineWidth, smoothColors);
            continue;
        }

        if (i === 1 || i === points.length - 2) {
            let smoothColors = [];
            colors.forEach((color) => smoothColors.push({...color}));

            smoothColors.forEach((color) => color.brightness *= 0.4);
            printLine(points[i], oneLineWidth, smoothColors);
            continue;
        }

        printLine(points[i], oneLineWidth, colors);
    }
}

function printWithThreeEndLinesSmooth(points, oneLineWidth, colors) {
    for (let i = 0; i < points.length; i++) {
        if (i === 0 || i === points.length - 1) {
            let smoothColors = [];
            colors.forEach((color) => smoothColors.push({...color}));

            smoothColors.forEach((color) => color.brightness *= 0.2);
            printLine(points[i], oneLineWidth, smoothColors);
            continue;
        }

        if (i === 1 || i === points.length - 2) {
            let smoothColors = [];
            colors.forEach((color) => smoothColors.push({...color}));

            smoothColors.forEach((color) => color.brightness *= 0.4);
            printLine(points[i], oneLineWidth, smoothColors);
            continue;
        }

        if (i === 2 || i === points.length - 3) {
            let smoothColors = [];
            colors.forEach((color) => smoothColors.push({...color}));

            smoothColors.forEach((color) => color.brightness *= 0.6);
            printLine(points[i], oneLineWidth, smoothColors);
            continue;
        }

        printLine(points[i], oneLineWidth, colors);
    }
}

function printBlackScreen() {
    new paper.Path.Rectangle({
        topLeft: {
            x:0,
            y:0
        },
        size: {
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT
        },
        fillColor: '0x000000'
    });
}

function printLine(point, oneLineWidth, colors) {
    createLeftRectangle(oneLineWidth, point, colors);
    createRightRectangle(oneLineWidth, point, colors);
}

function getLineNumber(pictureWidth, oneLineWidth) {
    let allLines = pictureWidth / oneLineWidth;
    if (allLines >= 1 && allLines < 2) {
        return  1;
    }
    return  Math.floor(pictureWidth / oneLineWidth / 2);
}

function getColors(oneLineWidth, hueLambda) {
    let colors = [];
    for (let x = 0; x < oneLineWidth; x += oneLineWidth / 10) {
        colors.push({
            hue: hueLambda,
            saturation: 1,
            brightness: brightnessWidth(oneLineWidth, x)
        });
    }

    return colors;
}

function createPoints(pictureWidth, lineNumber, oneLineWidth) {
    let points = [];
    let spaceBetweenLines = spaceBetweenLinesFunction(pictureWidth, oneLineWidth, lineNumber);

    for (let i = 0; i < lineNumber; i++) {
        let x = 0;

        if (i === 0) {
            x = (SCREEN_WIDTH - pictureWidth) / 2 + oneLineWidth / 2;
        } else {
            x = i * oneLineWidth * 2 + (SCREEN_WIDTH - pictureWidth) / 2 + oneLineWidth / 2;
        }

        points.push(new paper.Point({
            x: x,
            y: 0
        }));

    }

    return points;
}

function spaceBetweenLinesFunction(pictureWidth, oneLineWidth, lineNumber) {
    return (pictureWidth - oneLineWidth * lineNumber) / (lineNumber + 1);
}

function createLeftRectangle(oneLineWidth, point, colors) {
    new paper.Path.Rectangle({
        topRight: point.add({x: 1, y: 0}),
        size: {
            width: oneLineWidth / 2,
            height: SCREEN_HEIGHT
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

function createRightRectangle(oneLineWidth, point, colors) {
    new paper.Path.Rectangle({
        topLeft: point.add({x: -1, y: 0}),
        size: {
            width: oneLineWidth / 2,
            height: SCREEN_HEIGHT
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

//1 см 1000 пикселей
function oneLineWidthFunction(a, b, lambda, teta, n) {
    return lambda * 1e-9 / (2 * teta * (n - 1)) * 1e5;
}

function ab(a, teta, n) {
    return (a * Math.cos(teta * n) * Math.cos(teta * (n - 1))) / (2 * teta * (n - 1) * Math.cos(teta));
}

//1 см 1000 пикселей
function pictureWidthFunction(a, b, teta, n) {
    //выдерживаем масштаб рисунка
    let abVar = ab(a, teta, n);
    currentRombLength = 2 * abVar;
    currentRombHeight = currentA / 2 * abVar / (currentA / 2 * teta * (n - 1) + currentRombLength);
    console.log("currentRombHeight: " + currentRombHeight);
    if (b <= ab(a, teta, n)) {
        return 2 * b * teta * (n - 1) * 1e5;
    } else {
        return 2 * ((a * Math.cos(teta * n) * Math.cos(teta * (n - 1))) / Math.cos(teta) - teta * b * (n - 1)) * 1e5;
    }
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
        return 150 + 5/3 * (510 - lambda);
    }

    //синий 200 - 250
    if (lambda < 480 && lambda >= 450) {
        return 200 + 5/3 * (480 - lambda);
    }

    //фиолетовый 250 - 270
    //lambda 450 - 380
    return 250 + 2/7 * (450 - lambda);
}

// width of interferencionniy line
// x - from 0 to 1 width
function brightnessWidth(width, x) {
    let x_percent = x / width * 100;

    return x_percent > 10 ? 0.01 * (100 - (x_percent - 10)) : 1;
}