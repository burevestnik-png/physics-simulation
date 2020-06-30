let currentA;
let currentB;
let currentLambda;
let currentTeta;
let currentN;

$(document).ready(function () {
    $('#a-input').change(function () {
        currentA = $(this).valueAsNumber;
    });

    $('#b-input').change(function () {
        currentB = $(this).valueAsNumber;
    });

    $('#n-input').change(function () {
        currentN = $(this).valueAsNumber;
    });

    $('#teta-input').change(function () {
        currentTeta = $(this).valueAsNumber;
    });

    $('#lambda-input').change(function () {
        currentLambda = $(this).valueAsNumber;
    });
});