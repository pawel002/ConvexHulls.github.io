'use strict'

import { jarvis } from "./algorithms/jarvis.js";

export const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let slider = document.getElementById("animationSlider");
let generatePointsButton = document.getElementById("generatePointsButton");
let visualizeButton = document.getElementById("visualizeButton");

var points = [];
var animationSpeed = 10;
export {animationSpeed};

slider.oninput = function() {
    animationSpeed = this.value;
}

function generatePoints(){
    clearCanvas();

    var numberOfPoints = document.getElementById('generatePointsNumber').value;

    points = [];
    for (let i = 0; i < numberOfPoints; i++) {
        points.push([Math.random(), Math.random()]);
    }
    console.log(points);

    drawPoints();
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPoints(){
    points.forEach(function(point) {
        const x = canvas.width*(0.05 + point[0] * 0.9);
        const y = canvas.height*(0.05 + point[1] * 0.9);
  
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#FF0000';
        ctx.stroke();
    });
}

canvas.addEventListener('click', function(event) {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    points.push([(x / canvasWidth - 0.05) * 10.0 / 9.0, (y / canvasHeight - 0.05) * 10.0 / 9.0]);

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#00FF00';
    ctx.stroke();

    console.log(points);
});

// main function
function visualize(){
    jarvis(ctx, points);
}


generatePointsButton.addEventListener("click", generatePoints);
visualizeButton.addEventListener("click", visualize);


