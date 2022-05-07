import SimpleCanvas from './index';

const root = document.getElementById('app');

if (root) {
  const canvas = new SimpleCanvas(root, 500, 500);

  function loop() {
    canvas.clear('#f1f1f1');
    canvas.drawPoly(50, 50, 40, 5, 0, 'red');
    canvas.drawRectangle(30, 80, 40, 50, Math.PI*0.25, 'green');
    canvas.drawCircleOutline(100, 100, 40, 10, 'pink');
    requestAnimationFrame(loop);
  }
  loop();
}
