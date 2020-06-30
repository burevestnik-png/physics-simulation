function oneLineWidth(a, b, lambda, teta, n) {
    return (a + b) * lambda / (2 * a * teta * (n - 1));
}

function pictureWidth(b, teta, n) {
    return 2 * b * teta * (n - 1);
}

function hueLambda(lambda) {
    return 0.7 * (780 - lambda);
}

// width of interferencionniy line
// x - from 0 to 0.5 width
function brightnessWidth(width, x) {
    let x_percent = x / width * 100;

    return 0.1 * (50 - x_percent);
}

$(document).ready(function () {
    let oneLineWidth = oneLineWidth(currentA, currentB, currentLambda, currentTeta, currentN);
    let hueLambda = hueLambda(currentLambda);

    let colors = [];
    for (let x = 0; x <= oneLineWidth; x+= oneLineWidth / 100) {
        colors.push({
           hue: hueLambda,
           saturation: 1,
           brightness: brightnessWidth(oneLineWidth, x)
        });
    }

    let point = new paper.Point({
        x: 50,
        y: 100
    });
    let rectangle = new paper.Path.Rectangle({
        rectangle: [100, 200],
        fillColor: {
            origin: point,
            destination: point.add({ x: 50, y: 100}),
            gradient: {
                stops: colors,
                radial: false
            }
        }
    });


});