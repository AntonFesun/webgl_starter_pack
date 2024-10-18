import {getRandomColorHex, hexToRgb} from "./color_helpers.js";

export const numPoints = 2_000_000;

export function generatePointsAndColors(numPoints) {
    const points = [];

    for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;

        const color = getRandomColorHex();

        points.push({
            id: i + 1,
            x: x,
            y: y,
            color: color
        });
    }
    return points;
}

export function prepareWebGLData() {
    const points = generatePointsAndColors(numPoints);
    let positions = new Float32Array(points.length * 2);
    let colors = new Float32Array(points.length * 3);

    points.forEach((point, index) => {
        positions[index * 2] = point.x;
        positions[index * 2 + 1] = point.y;

        const [r, g, b] = hexToRgb(point.color);

        colors[index * 3] = r;
        colors[index * 3 + 1] = g;
        colors[index * 3 + 1] = b;
    });


    return {positions, colors};
}
