'use strict'

import { jarvis } from "./algorithms/jarvis.js";
import { clearCanvas, drawPoints } from "./algorithms/helpers.js";
import { grahams } from "./algorithms/grahams.js";

export const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var slider = document.getElementById("animationSlider");
var generatePointsButton = document.getElementById("generatePointsButton");
var visualizeButton = document.getElementById("visualizeButton");
var selectedAlgorithm =  document.getElementById("selectAlgorithm");

var generatedPoints = [];
var addedPoints = [];
var animationSpeed = 10;
export {animationSpeed};

slider.oninput = function() {
    animationSpeed = this.value;
}

function generatePoints(){
    clearCanvas(ctx);
    var numberOfPoints = document.getElementById('generatePointsNumber').value;

    generatedPoints = [];
    for (let i = 0; i < numberOfPoints; i++) {
        generatedPoints.push([Math.random(), Math.random()]);
    }

    drawPoints(ctx, generatedPoints, 'black');
    drawPoints(ctx, addedPoints, '#00FF00');
}

canvas.addEventListener('click', function(event) {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    addedPoints.push([(x / canvasWidth - 0.05) * 10.0 / 9.0, (y / canvasHeight - 0.05) * 10.0 / 9.0]);

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#00FF00';
    ctx.stroke();

});

// main function
function visualize(){

    if (selectedAlgorithm.options[selectedAlgorithm.selectedIndex].text == "Jarvis")
        jarvis(ctx, addedPoints, generatedPoints);

    if (selectedAlgorithm.options[selectedAlgorithm.selectedIndex].text == "Grahams")
        grahams(ctx, addedPoints, generatedPoints);
}


generatePointsButton.addEventListener("click", generatePoints);
visualizeButton.addEventListener("click", visualize);


