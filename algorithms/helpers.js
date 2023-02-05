
import { canvas } from "../app.js";

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function drawLine(ctx, begin, end, stroke = 'black', width = 1) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    function getScaledX(x){
        return canvas.width*(0.05 + x * 0.9)
    }

    function getScaledY(y){
        return canvas.height*(0.05 + y * 0.9)
    }

    ctx.beginPath();
    ctx.moveTo(getScaledX(begin[0]), getScaledY(begin[1]));
    ctx.lineTo(getScaledX(end[0]), getScaledY(end[1]));
    ctx.stroke();
}

export function det(a, b, c) {
    return (a[0] - c[0]) * (b[1] - c[1]) - (b[0] - c[0]) * (a[1] - c[1]);
}
  
export function orient(a, b, c) {
    const d = det(a, b, c);
    const eps = 0.0000001;
  
    if (d > eps) {
        return 1;
    } else if (d < -eps) {
        return -1;
    }

    return 0;
}