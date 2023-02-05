
import { orient, lengthSquared, drawPoints, clearCanvas, sleep, drawLine } from "./helpers.js";
import { animationSpeed } from "../app.js";

function grahamsCmp(a, b, c) {
    let val = orient(a, b, c);

    if (val !== 0) return val;
    
    if (lengthSquared(a, b) >= lengthSquared(a, c)) return 1;
    
    return -1;
}
  
export async function grahams(ctx, addedPoints, generatedPoints) {

    function drawBothPoints(ap, gp){
        drawPoints(ctx, ap, '#00FF00');
        drawPoints(ctx, gp, 'black');
    }

    clearCanvas(ctx);
    drawBothPoints(addedPoints, generatedPoints);
    var points = [].concat(addedPoints, generatedPoints);

    let startPoint = points.reduce((minPoint, point) => {
        if (point[1] < minPoint[1] || (point[1] === minPoint[1] && point[0] < minPoint[0])) return point;
        return minPoint;
    }, points[0]);
    
    let startIndex = points.indexOf(startPoint);
    let start = points.splice(startIndex, 1)[0];

    points.sort((x, y) => grahamsCmp(start, y, x));

    let hull = [start, ...points.slice(0, 2)];
    
    for (let i = 0; i < points.length; i++) {
        let val = orient(hull[hull.length - 2], hull[hull.length - 1], points[i]);
    
        if (val == 0) {
            hull.pop();
            hull.push(points[i]);
        } else if (val == 1)
            hull.push(points[i]);
        else
            hull.pop();

        clearCanvas(ctx);
        drawBothPoints(addedPoints, generatedPoints);
        drawPoints(ctx, hull, 'red');
        for (let i = 0; i < hull.length - 1; i++) {
            drawLine(ctx, hull[i], hull[(i + 1) % hull.length], 'green', 2);
        }
        await sleep(animationSpeed);
    }
    
    if (orient(hull[hull.length - 2], hull[hull.length - 1], hull[0]) == 0)
        hull.pop();

    clearCanvas(ctx);
    drawBothPoints(addedPoints, generatedPoints);
    drawPoints(ctx, hull, 'red');
    for (let i = 0; i < hull.length; i++) {
        drawLine(ctx, hull[i], hull[(i + 1) % hull.length], 'green', 2);
    }
}
  