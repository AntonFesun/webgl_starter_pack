import {numPoints, prepareWebGLData} from "./helpers/data_generator_helper.js";

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

async function main() {
    const timeStart = performance.now();
    const vertexShaderSource = await fetchShader(vertexShaderUrl);
    const fragmentShaderSource = await fetchShader(fragmentShaderUrl);

    const canvas = document.getElementById("glCanvas");

    const gl = initWebGL(canvas);

    if (!gl) {
        return null;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);


    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    const colorAttributeLocation = gl.getAttribLocation(program, "a_color");
    gl.enableVertexAttribArray(colorAttributeLocation);
    gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    const matrixUniformLocation = gl.getUniformLocation(program, "u_matrix");

    let scale = 1.0;
    let translateX = 0;
    let translateY = 0;

    let isDragging;

    let lastX = 0;
    let lastY = 0;

    function drawScene() {
        const projectionMatrix = createProjectionMatrix(scale, translateX, translateY);
        gl.uniformMatrix4fv(matrixUniformLocation, false, projectionMatrix);
        gl.clearColor(1.0, 1.1, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, numPoints);
    }

    canvas.addEventListener("wheel", (event) => {
       const zoomSpeed = 0.1;

       if (event.deltaY > 0) {
           scale *= (1 - zoomSpeed);
       } else {
           scale *= (1 + zoomSpeed);
       }

       drawScene();
    });

    canvas.addEventListener("mousedown", (event) => {
       isDragging = true;
       lastX = event.clientX;
       lastY = event.clientY;
    });

    canvas.addEventListener("mouseup", () => {
        isDragging = false;
    })

    canvas.addEventListener("mousemove", (event) => {
        if (isDragging) {
            const dx = (event.clientX - lastX) / canvas.width * 2;
            const dy = (event.clientY - lastY) / canvas.height * -2;

            translateX += dx;
            translateY += dy;

            lastX = event.clientX;
            lastY = event.clientY;

            drawScene();
        }
    });



    drawScene();
    const timeEnd = performance.now();
    console.log(timeEnd - timeStart);
}

window.onload = main;

