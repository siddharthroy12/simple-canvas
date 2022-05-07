## simple-canvas2d

> A simple library for making graphics and games using Canvas API

## Installing

Using npm:

```sh
$ npm install simple-canvas2d
```

Using yarn:

```sh
$ yarn add simple-canvas2d
```

Using CDN:
```sh
Cooming soon
```

## Example

```js
import SimpleCanvas from 'simple-canvas2d';

// Where you want to add the canvas element
const root = document.getElementById('app');

if (root) {
  // Create a new Canvas with 500x500 pixels
  const canvas = new SimpleCanvas(root, 500, 500);

  // Animation loop
  function loop() {
    canvas.clear('#f1f1f1');
    canvas.drawPoly(50, 50, 40, 5, 0, 'red');
    canvas.drawRectangle(30, 80, 40, 50, Math.PI*0.25, 'green');
    canvas.drawCircleOutline(100, 100, 40, 10, 'pink');
    requestAnimationFrame(loop);
  }
  loop();
}

```

## API

###### Creating a canvas

Note that the renderWidth and renderHeight is how many pixels the canvas is going to use for rendering and this does not change the actual width and height of the canvas element, for that use CSS

```js
const canvas = new SimpleCanvas(root, renderWidth, renderHeight);
```

###### Resize Render Resolution

```js
canvas.resizeRenderResolution(newRenderWidth, newRenderHeight);
```

###### Clear canvas
Clear the entire canvas with any color
> NOTE: The color is a CSS color value

```js
canvas.clear(color);
```

###### Draw Pixel

> NOTE: The color is a CSS color value

```js
canvas.drawPixel(posX, posY, color);
```

###### Draw Line

```js
canvas.drawLine(startPosX, startPosY, endPosX, endPosY, width, color);
```

###### Draw Circle

```js
canvas.drawCircle(posX, posY, radius, color);
```

###### Draw Circle Outline

```js
canvas.drawCircleOutline(posX, posY, radius, width, color);
```

###### Draw Circle Outline

```js
canvas.drawCircleOutline(posX, posY, radius, width, color);
```

###### Draw Arc
> NOTE: angle is in radian, Math.PI is half circle and Math.PI*2 is full circle
```js
canvas.drawArc(posX, posY, radius, startAngle, endAngle, color);
```

###### Draw Arc Outline
```js
canvas.drawArc(posX, posY, radius, startAngle, endAngle, width, color);
```

###### Draw Ellipse
```js
canvas.drawEllipse(posX, posY, radiusX, radiusY, rotation, startAngle, endAngle, color);
```

###### Draw Ellipse Outline
```js
canvas.drawEllipseOutline(posX, posY, radiusX, radiusY, rotation, startAngle, endAngle, width, color);
```

###### Draw Rectangle

```js
canvas.drawRectangle(posX, posY, width, height, rotation, color);
```

###### Draw Rectangle Outline

```js
canvas.drawRectangleOutline(posX, posY, width, height, rotation, outlineWidth, color);
```

###### Draw Rectangle Rounded
The radius can be either a number for all sides or it can be a object of type
```js
{
  tl: number; // Top left
  tr: number; // Top right
  br: number; // Bottom right
  bl: number; // Bottom left
}
```
```js
canvas.drawRectangleRounded(posX, posY, width, height, radius, rotation, color)
```

###### Draw Rectangle Rounded Outline
```js
canvas.drawRectangleRoundedOutline(posX, posY, width, height, radius, rotation, outlineWidth, color);
```

###### Draw Polygon
```js
canvas.drawPoly(posX, posY, radius, numberOfSides, rotation, color);
```

###### Draw Polygon Outline
```js
canvas.drawPolyOutline(posX, posY, radius, numberOfSides, rotation, outlineWidth, color);
```

###### Draw Shape from points
The points is an array of type
```js
{
    x: number;
    y: number;
}
```
The origin is also of type `{ x:number, y:number }` used for rotation, leave it to `{ x: 0, y: }` if rotation is 0
```js
canvas.drawShape(points, origin, rotation, color);
```

###### Draw Shape outline from points
```js
canvas.drawShapeOutline(points, origin, rotation, width color);
```

###### Measure Text Width
```js
canvas.measureText(text, fontSize, fontFamily);
```

###### Draw Text
`align` can be `'left'`, `'right'` , `'center'`, `'start'`or `'end'`.
`direction` can be `'ltr'` or `'rtl'`. 
`maxWidth` will be ignored if set `undefined`
```js
canvas.drawText(text, posX, posY, fontSize, fontFamily, align, direction, maxWidth, rotation, origin, color);
```

###### Draw Text Outline
```js
canvas.drawText(text, posX, posY, fontSize, fontFamily, align, direction, maxWidth, rotation, origin, lineWidth, color);
```

###### Set Camera
Set where the camera will look at with zoom and rotation
```js
canvas.camera(posX, posY, zoom, rotation);
```

###### Load Image
>NOTE: This is a static method
```js
canvas.loadImage(url)
    .then(image => {});
```

###### Draw Image
![explaination](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage/canvas_drawimage.jpg)
```js
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, rotation);
```