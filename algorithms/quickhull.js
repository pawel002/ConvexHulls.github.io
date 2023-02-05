import { clearCanvas, drawLine, drawPoints, det, sleep } from "./helpers.js";
import { animationSpeed } from "../app.js";


export async function quickhull(ctx, addedPoints, generatedPoints) {

    function drawBothPoints(ap, gp){
        drawPoints(ctx, ap, '#00FF00');
        drawPoints(ctx, gp, 'black');
    }
    
    let points = [].concat(addedPoints, generatedPoints);

    let leftmost = points.reduce((minPoint, point) => {
        if (point[0] < minPoint[0]) return point;
        return minPoint;
    }, points[0]);

    let rightmost = points.reduce((maxPoint, point) => {
        if (point[0] > maxPoint[0]) return point;
        return maxPoint;
    }, points[0]);

    clearCanvas(ctx);
    drawBothPoints(addedPoints, generatedPoints);
    drawLine(ctx, leftmost, rightmost, 'green', 2);
    await sleep(animationSpeed);
  
    let hull = [leftmost, rightmost];
  
    let prevhulls = [];
  
    let leftPoints = points.filter(
        p => p !== leftmost && p !== rightmost && det(leftmost, rightmost, p) > 0
    );

    let rightPoints = points.filter(
        p => p !== leftmost && p !== rightmost && det(leftmost, rightmost, p) < 0
    );
  
    let que = [[leftmost, rightmost, leftPoints], [rightmost, leftmost, rightPoints]];
  
    while (que.length > 0) {

        let [p1, p2, currPoints] = que.shift();
        if (!currPoints.length) continue;
        
        let farthest = currPoints.reduce((prev, curr) =>
            det(p1, p2, prev) > det(p1, p2, curr) ? prev : curr
        );

        hull.splice(hull.indexOf(p2), 0, farthest);
        
        prevhulls.push([p1, p2]);
        
        leftPoints = points.filter(p => p !== farthest && det(p1, farthest, p) > 0);
        rightPoints = points.filter(p => p !== farthest && det(farthest, p2, p) > 0);
        
        que.push([p1, farthest, leftPoints]);
        que.push([farthest, p2, rightPoints]);

        clearCanvas(ctx);
        drawBothPoints(addedPoints, generatedPoints);

        for(let line of prevhulls) drawLine(ctx, line[0], line[1], 'gray', 2);

        for(let i=0; i<hull.length; i++) drawLine(ctx, hull[i], hull[(i + 1) % hull.length], 'green', 2);

        await sleep(animationSpeed);
    }
}