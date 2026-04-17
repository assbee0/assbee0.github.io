'use strict';

// 画布初始化
const canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gkhead = new Image();

window.onload = function () {
    const ctx = canvas.getContext('2d');
    trackTransforms(ctx);

    function redraw() {
        // 清除整个画布
        const p1 = ctx.transformedPoint(0, 0);
        const p2 = ctx.transformedPoint(canvas.width, canvas.height);
        ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        ctx.drawImage(gkhead, 0, 0);
    }

    redraw();

    let lastX = canvas.width / 2;
    let lastY = canvas.height / 2;
    let dragStart = null;
    let dragged = false;

    const scaleFactor = 1.1;

    // 鼠标事件处理
    canvas.addEventListener('mousedown', function (evt) {
        document.body.style.mozUserSelect =
            document.body.style.webkitUserSelect =
            document.body.style.userSelect = 'none';

        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragStart = ctx.transformedPoint(lastX, lastY);
        dragged = false;
    }, false);

    canvas.addEventListener('mousemove', function (evt) {
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragged = true;

        if (dragStart) {
            const pt = ctx.transformedPoint(lastX, lastY);
            ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
            redraw();
        }
    }, false);

    canvas.addEventListener('mouseup', function (evt) {
        dragStart = null;
        if (!dragged) {
            zoom(evt.shiftKey ? -1 : 1);
        }
    }, false);

    // 缩放功能
    function zoom(clicks) {
        const pt = ctx.transformedPoint(lastX, lastY);
        ctx.translate(pt.x, pt.y);
        const factor = Math.pow(scaleFactor, clicks);
        ctx.scale(factor, factor);
        ctx.translate(-pt.x, -pt.y);
        redraw();
    }

    // 滚动事件处理
    function handleScroll(evt) {
        const delta = evt.wheelDelta
            ? evt.wheelDelta / 40
            : evt.detail ? -evt.detail : 0;

        if (delta) {
            zoom(delta);
        }
        evt.preventDefault();
        return false;
    }

    canvas.addEventListener('DOMMouseScroll', handleScroll, false);
    canvas.addEventListener('mousewheel', handleScroll, false);
};

gkhead.src = "biology1_1.png";

/**
 * 给Canvas上下文添加坐标变换追踪功能
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D上下文
 */
function trackTransforms(ctx) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    let xform = svg.createSVGMatrix();
    const savedTransforms = [];

    ctx.getTransform = function () {
        return xform;
    };

    const save = ctx.save;
    ctx.save = function () {
        savedTransforms.push(xform.translate(0, 0));
        return save.call(ctx);
    };

    const restore = ctx.restore;
    ctx.restore = function () {
        xform = savedTransforms.pop() || xform;
        return restore.call(ctx);
    };

    const scale = ctx.scale;
    ctx.scale = function (sx, sy) {
        xform = xform.scaleNonUniform(sx, sy);
        return scale.call(ctx, sx, sy);
    };

    const rotate = ctx.rotate;
    ctx.rotate = function (radians) {
        xform = xform.rotate(radians * 180 / Math.PI);
        return rotate.call(ctx, radians);
    };

    const translate = ctx.translate;
    ctx.translate = function (dx, dy) {
        xform = xform.translate(dx, dy);
        return translate.call(ctx, dx, dy);
    };

    const transform = ctx.transform;
    ctx.transform = function (a, b, c, d, e, f) {
        const m2 = svg.createSVGMatrix();
        m2.a = a; m2.b = b; m2.c = c; m2.d = d; m2.e = e; m2.f = f;
        xform = xform.multiply(m2);
        return transform.call(ctx, a, b, c, d, e, f);
    };

    const setTransform = ctx.setTransform;
    ctx.setTransform = function (a, b, c, d, e, f) {
        xform.a = a; xform.b = b; xform.c = c;
        xform.d = d; xform.e = e; xform.f = f;
        return setTransform.call(ctx, a, b, c, d, e, f);
    };

    const pt = svg.createSVGPoint();
    ctx.transformedPoint = function (x, y) {
        pt.x = x; pt.y = y;
        return pt.matrixTransform(xform.inverse());
    };
}