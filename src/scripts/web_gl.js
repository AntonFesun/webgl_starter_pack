console.log("=D");

const vertexShaderUrl = "../scripts/shaders/vertex.glsl";
const fragmentShaderUrl = "../scripts/shaders/fragment.glsl";

function fetchShader(url) {
    return fetch(url).then(response => response.text());
}

function generatePoints(numPoints) {
    const positions = new Float32Array(numPoints * 2);
    for (let i = 0; i < numPoints * 2; i++) {
        positions[i] = Math.random() * 2 - 1;
    }
    return positions;
}

function generateColors(numPoints) {
    const colors = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
        const colorIndex = i % 40;
        const [r, g, b] = getColorFromIndex(colorIndex);
        colors[i * 3] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
    }
    return colors;
}

function getColorFromIndex(index) {
    const hue = (index * 360) / 40;
    return hslToRgb(hue / 360, 1, 0.5);
}

function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 3) return q;
            if (t < 1 / 2) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r, g, b];
}

const numPoints = 2_000_000;
const positions = generatePoints(numPoints);
const colors = generateColors(numPoints);

function initWebGL(canvas) {}

function createShader(gl, type, source) {}

function createProgram(gl, vertexShader, fragmentShader) {}

function createProjectionMatrix(scale, tx, ty) {}

function main() {
    // We are going to do some magic here;
}

window.onload = main;
