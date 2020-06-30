function oneLineWidth(a, b, lambda, teta, n) {
    return (a + b) * lambda / (2 * a * teta * (n - 1));
}

function pictureWidth(b, teta, n) {
    return 2 * b * teta * (n - 1);
}

$(document).ready(function () {
    paper
});