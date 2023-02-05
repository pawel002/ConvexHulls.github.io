
import { orient, lengthSquared, drawPoints, clearCanvas, sleep, drawLine, det } from "./helpers.js";
import { animationSpeed } from "../app.js";


export async function upperlower(ctx, addedPoints, generatedPoints) {

    function drawBothPoints(ap, gp){
        drawPoints(ctx, ap, '#00FF00');
        drawPoints(ctx, gp, 'black');
    }

    clearCanvas(ctx);
    drawBothPoints(addedPoints, generatedPoints);
    var points = [].concat(addedPoints, generatedPoints);

    points.sort();
  
    if (points.length <= 1) {
        return points;
    }
  
    let lower = [];

    for (let p of points) {
        while (lower.length >= 2 && det(lower[lower.length - 2], lower[lower.length - 1], p) <= 0){
            lower.pop();
            if (lower.length > 0){
                clearCanvas(ctx);
                drawBothPoints(addedPoints, generatedPoints);
                for (let i = 0; i < lower.length - 1; i++) {
                    drawLine(ctx, lower[i], lower[(i + 1) % lower.length], 'green', 2);
                }
                await sleep(animationSpeed);
            }
        }

        lower.push(p);
        clearCanvas(ctx);
        drawBothPoints(addedPoints, generatedPoints);
        for (let i = 0; i < lower.length - 1; i++) {
            drawLine(ctx, lower[i], lower[(i + 1) % lower.length], 'green', 2);
        }
        await sleep(animationSpeed);
    }
  
    let upper = [];
    for (let p of points.reverse()) {
        while (upper.length >= 2 && det(upper[upper.length - 2], upper[upper.length - 1], p) <= 0){
            upper.pop();
            clearCanvas(ctx);
            drawBothPoints(addedPoints, generatedPoints);
            for (let i = 0; i < lower.length - 1; i++) {
                drawLine(ctx, lower[i], lower[(i + 1) % lower.length], 'green', 2);
            }
            for (let i = 0; i < upper.length - 1; i++) {
                drawLine(ctx, upper[i], upper[(i + 1) % upper.length], 'red', 2);
            }
            await sleep(animationSpeed);
        }
      
        upper.push(p);
        clearCanvas(ctx);
        drawBothPoints(addedPoints, generatedPoints);
        for (let i = 0; i < lower.length - 1; i++) {
            drawLine(ctx, lower[i], lower[(i + 1) % lower.length], 'green', 2);
        }
        for (let i = 0; i < upper.length - 1; i++) {
            drawLine(ctx, upper[i], upper[(i + 1) % upper.length], 'red', 2);
        }
        await sleep(animationSpeed);
    }
}