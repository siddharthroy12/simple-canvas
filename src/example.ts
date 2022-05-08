import SimpleCanvas from './index';

const root = document.getElementById('app');

if (root) {
  let cameraPosY = 1;

  window.addEventListener('keydown', (_) => {
    cameraPosY += 1;
  })

  const canvas = new SimpleCanvas(root, 500, 500);

  function loop() {
    canvas.clear('#f1f1f1');
    canvas.cameraStart(0, 0, 1, Math.PI*0.25);
    canvas.drawCircle(0 , 0, 10);
    canvas.drawRectangle(50, -10, 40, 20, Math.PI*0.5, 'green');
    canvas.drawLine(0, 0, 50, 0);
    canvas.cameraEnd();
    requestAnimationFrame(loop);
  }
  loop();
}
