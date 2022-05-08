import SimpleCanvas2D from './index';

const root = document.getElementById('app');

if (root) {
  const canvas = new SimpleCanvas2D(root, 500, 500);

  function loop() {
    canvas.clear('#f1f1f1');
    canvas.cameraStart(0, 0, 2, Math.PI*0.25);
    canvas.drawCircle(0 , 0, 10);
    canvas.drawRectangle(50, -10, 40, 20, Math.PI*0.5, 'green');
    canvas.drawLine(0, 0, 50, 0);
    const pos = canvas.getMousePosOnCanvas();
    if (pos) {
      canvas.drawCircle(pos.x, pos.y, 10);
    }
    canvas.cameraEnd();
    requestAnimationFrame(loop);
  }
  loop();
}
