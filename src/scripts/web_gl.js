import {hexToRgb} from "./helpers/color_helpers.js";
import {prepareWebGLData} from "./helpers/data_generator_helper.js";

const vertexShaderUrl = "../scripts/shaders/vertex.glsl";
const fragmentShaderUrl = "../scripts/shaders/fragment.glsl";


const { positions, colors } = prepareWebGLData();

function initWebGL(canvas) {
    const gl = canvas.getContext("webgl");

    if (!gl) {
        console.error("WebGL not supported");
        return null;
    }

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    gl.viewport(0, 0, canvas.width, canvas.height);

    return gl;
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Compilation shader error");
        return null;
    }

    console.log(gl.getShaderInfoLog(shader));
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log("Link error program");
        gl.deleteProgram(program);
        return null;
    }

    return program;
}

function createProjectionMatrix(scale, tx, ty) {
    return new Float32Array([
        scale, 0, 0, 0,
        0, scale, 0, 0,
        0, 0, 1, 0,
        tx, ty, 0, 1
    ]);
}

function fetchShader(url) {
    return fetch(url).then(response => response.text());
}

function main() {}

window.onload = main;

