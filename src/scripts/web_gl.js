import {hexToRgb} from "./helpers/color_helpers.js";
import {prepareWebGLData} from "./helpers/data_generator_helper.js";

const vertexShaderUrl = "../scripts/shaders/vertex.glsl";
const fragmentShaderUrl = "../scripts/shaders/fragment.glsl";


const { positions, colors } = prepareWebGLData();

function initWebGL(canvas) {}

function createShader(gl, type, source) {}

function createProgram(gl, vertexShader, fragmentShader) {}

function createProjectionMatrix(scale, tx, ty) {}

function fetchShader(url) {
    return fetch(url).then(response => response.text());
}

function main() {}

window.onload = main;

