import {getRandomColorHex} from "./color_helpers.js";

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
    let positions;
    let colors;

    return {positions, colors};
}
