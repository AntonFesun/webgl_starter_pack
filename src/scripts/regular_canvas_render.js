function generatePoints(numPoints) {
    const positions = [];
    for (let i = 0; i < numPoints; i++) {
        positions.push({
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
        });
    }
    return positions;
}

const numPoints = 2_000_000;
const positions = generatePoints(numPoints);

function initCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Canvas not supported");
        return null;
    }
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    return ctx;
}

function createProjectionMatrix(scale, tx, ty) {
    return {
        scale: scale,
        tx: tx,
        ty: ty
    };
}

function drawScene(ctx, matrix) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.save();
    ctx.translate(ctx.canvas.width / 2 + matrix.tx, ctx.canvas.height / 2 + matrix.ty);
    ctx.scale(matrix.scale, matrix.scale);

    ctx.fillStyle = 'black';
    positions.forEach(pos => {
        const x = pos.x * (ctx.canvas.width / 2);
        const y = pos.y * (ctx.canvas.height / 2);
        ctx.fillRect(x, y, 1, 1);
    });

    ctx.restore();
}

function main() {
    const timeStart = performance.now();
    const canvas = document.getElementById("glCanvas");
    const ctx = initCanvas(canvas);
    if (!ctx) return;

    let scale = 1.0;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    function updateScene() {
        const projectionMatrix = createProjectionMatrix(scale, translateX, translateY);
        drawScene(ctx, projectionMatrix);
    }

    canvas.addEventListener('wheel', (event) => {
        event.preventDefault();
        const zoomSpeed = 0.1;
        if (event.deltaY > 0) {
            scale *= (1 - zoomSpeed);
        } else {
            scale *= (1 + zoomSpeed);
        }
        updateScene();
    });

    canvas.addEventListener('mousedown', (event) => {
        isDragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const dx = event.clientX - lastX;
            const dy = event.clientY - lastY;

            translateX += dx;
            translateY += dy;

            lastX = event.clientX;
            lastY = event.clientY;

            updateScene();
        }
    });

    updateScene();
    const timeEnd = performance.now();
    console.log(timeEnd - timeStart);
}

window.onload = main;
