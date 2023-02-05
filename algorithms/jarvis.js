import { animationSpeed } from "../app.js";
import { orient, sleep, drawLine  } from './helpers.js'; 

function min_angle(a, b, c) {
    if (a[0] === b[0] && a[1] === b[1]) {
        return c;
    }
    if (a[0] === c[0] && a[1] === c[1]) {
        return b;
    }
  
    const val = orient(a, b, c);
  
    if (val === -1) {
        return b;
    } else if (val === 1) {
        return c;
    }
  
    if (lengthSquared(a, b) >= lengthSquared(a, c)) {
        return b;
    }
    return c;
}
  
export async function jarvis(ctx, points) {
    var start = points.reduce((minPoint, point) => {
        if (point[1] < minPoint[1]) {
            return point;
        } else if (point[1] === minPoint[1] && point[0] < minPoint[0]) {
            return point;
        }
            return minPoint;
    });

    const hull = [start];
    let point = start;

    while (true) {
        points.forEach(p => {
            point = min_angle(start, point, p);
        });
    start = point;
    if (hull[0] === point) {
        break;
    }
    hull.push(point);
    } 

    for (let i = 0; i < hull.length; i++) {
        drawLine(ctx, hull[i], hull[(i + 1) % hull.length], 'green', 2);
        console.log(animationSpeed);
        await sleep(animationSpeed);
    }
}