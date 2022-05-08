const DEFAULT_FILL_STROKE_COLOR = "black";
const DEFAULT_CLEAR_COLOR = "white";

type Radius = number | {
  tl: number;
  tr: number;
  br: number;
  bl: number;
};

type Point = {
  x: number;
  y: number;
};

// TODO:
// Add window to canvas camera pos
// Add canvas camera pos to canvas

class SimpleCanvas {
  canvasContext: CanvasRenderingContext2D|null;
  canvasElement: HTMLCanvasElement;

  private cameraOffestX:number = 0;
  private cameraOffestY:number = 0;
  private cameraZoom:number = 1;
  private cameraRotation:number = 0;

  constructor(root: HTMLElement, private renderWidth = 128, private renderHeight = 128) {
    const canvasEl = document.createElement("canvas");
    this.canvasElement = canvasEl;
    canvasEl.width = this.renderWidth;
    canvasEl.height = this.renderHeight;
    canvasEl.style.imageRendering = "pixelated";

    if (root) {
      root.appendChild(canvasEl);
    } else {
      document.body.appendChild(canvasEl);
    }

    this.canvasContext = canvasEl.getContext("2d");
    if (!this.canvasContext) {
      console.error("Failed to create canvas 2d context");
    }
  }

  resizeRenderResolution(newRenderWidth: number, newRenderHeight: number) {
    if (newRenderWidth) {
      this.renderWidth = newRenderWidth;
      this.canvasElement.width = newRenderWidth;
    }
    if (newRenderHeight) {
      this.renderHeight = newRenderHeight;
      this.canvasElement.height = newRenderHeight;
    }
  }

  clear(color: string) {
    if (this.canvasContext) {
      this.createTransform(0, 0, 1, 0);
      this.canvasContext.fillStyle = !!color ? color : DEFAULT_CLEAR_COLOR;
      this.canvasContext.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
      this.restoreCamera();
    }
  }

  drawPixel(posX = 0, posY = 0, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.fillStyle = color;
      this.canvasContext.fillRect(posX - 1, posY - 1, 1, 1);
    }
  }

  drawLine(startPosX = 0, startPosY = 0, endPosX = 0, endPosY = 0, width = 1, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.strokeStyle = color;
      this.canvasContext.lineWidth = width;
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(startPosX, startPosY);
      this.canvasContext.lineTo(endPosX, endPosY);
      this.canvasContext.stroke();
    }
  }

  drawCircle(posX = 0, posY = 0, radius = 0, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.fillStyle = color;
      this.canvasContext.beginPath();
      this.canvasContext.arc(posX, posY, radius, 0, 2 * Math.PI);
      this.canvasContext.fill();
    }
  }

  drawCircleOutline(posX = 0, posY = 0, radius = 0, width = 1, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.lineWidth = width;
      this.canvasContext.strokeStyle = color;
      this.canvasContext.beginPath();
      this.canvasContext.arc(posX, posY, radius, 0, 2 * Math.PI);
      this.canvasContext.stroke();
    }
  }

  drawArc(posX = 0, posY = 0, radius = 0, startAngle = 0, endAngle = 2 * Math.PI, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.fillStyle = color;
      this.canvasContext.beginPath();
      this.canvasContext.arc(posX, posY, radius, startAngle, endAngle);
      this.canvasContext.lineTo(posX, posY);
      this.canvasContext.fill();
    }
  }

  drawArcOutline(posX = 0, posY = 0, radius = 0, startAngle = 0, endAngle = 2 * Math.PI, width = 1, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.lineWidth = width;
      this.canvasContext.strokeStyle = color;
      this.canvasContext.beginPath();
      this.canvasContext.arc(posX, posY, radius, startAngle, endAngle);
      this.canvasContext.stroke();
    }
  }

  drawEllipse(posX = 0, posY = 0, radiusX = 0, radiusY = 0, rotation = 0, startAngle = 0, endAngle = 2 * Math.PI, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.fillStyle = color;
      this.canvasContext.beginPath();
      this.canvasContext.ellipse(posX, posY, radiusX, radiusY, rotation, startAngle, endAngle);
      this.canvasContext.lineTo(posX, posY);
      this.canvasContext.fill();
    }
  }

  drawEllipseOutline(posX = 0, posY = 0, radiusX = 0, radiusY = 0, rotation = 0, startAngle = 0, endAngle = 2 * Math.PI, width = 1, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.strokeStyle = color;
      this.canvasContext.lineWidth = width;
      this.canvasContext.beginPath();
      this.canvasContext.ellipse(posX, posY, radiusX, radiusY, rotation, startAngle, endAngle);
      this.canvasContext.stroke();
    }
  }

  drawRectangle(posX = 0, posY = 0, width = 0, height = 0, rotation = 0, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.fillStyle = color;
      this.canvasContext.translate(posX + width / 2, posY + height / 2);
      this.canvasContext.rotate(rotation);
      this.canvasContext.fillRect(-width / 2, -height / 2, width, height);
      this.restoreCamera();
    }
  }

  drawRectangleOutline(posX = 0, posY = 0, width = 0, height = 0, rotation = 0, outlineWidth = 1, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.fillStyle = color;
      this.canvasContext.lineWidth = outlineWidth;
      this.canvasContext.translate(posX + width / 2, posY + height / 2);
      this.canvasContext.rotate(rotation);
      this.canvasContext.strokeRect(-width / 2, -height / 2, width, height);
      this.restoreCamera();
    }
  }

  _drawRectangleRounded(posX = 0, posY = 0, width = 0, height = 0, radius: Radius = 0) {
    if (this.canvasContext) {
      if (typeof radius === "number") {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
      } else {
        radius.tr = radius.bl || 0;
        radius.tl = radius.bl || 0;
        radius.br = radius.bl || 0;
        radius.bl = radius.bl || 0;
      }
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(posX + radius.tl, posY);
      this.canvasContext.lineTo(posX + width - radius.tr, posY);
      this.canvasContext.quadraticCurveTo(posX + width, posY, posX + width, posY + radius.tr);
      this.canvasContext.lineTo(posX + width, posY + height - radius.br);
      this.canvasContext.quadraticCurveTo(posX + width, posY + height, posX + width - radius.br, posY + height);
      this.canvasContext.lineTo(posX + radius.bl, posY + height);
      this.canvasContext.quadraticCurveTo(posX, posY + height, posX, posY + height - radius.bl);
      this.canvasContext.lineTo(posX, posY + radius.tl);
      this.canvasContext.quadraticCurveTo(posX, posY, posX + radius.tl, posY);
      this.canvasContext.closePath();
    }
  }
  drawRectangleRounded(posX = 0, posY = 0, width = 0, height = 0, radius: Radius, rotation = 0, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.fillStyle = color;
      this.canvasContext.translate(posX + width / 2, posY + height / 2);
      this.canvasContext.rotate(rotation);
      this._drawRectangleRounded(-width / 2, -height / 2, width, height, radius);
      this.canvasContext.fill();
      this.restoreCamera();
    }
  }

  drawRectangleRoundedOutline(posX = 0, posY = 0, width = 0, height = 0, radius: Radius, rotation = 0, outlineWidth = 1, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.strokeStyle = color;
      this.canvasContext.lineWidth = outlineWidth;
      this.canvasContext.translate(posX + width / 2, posY + height / 2);
      this.canvasContext.rotate(rotation);
      this._drawRectangleRounded(-width / 2, -height / 2, width, height, radius);
      this.canvasContext.stroke();
      this.restoreCamera();
    }
  }

  _drawPoly(posX = 0, posY = 0, radius = 0, numberOfSides = 3) {
    if (this.canvasContext) {
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(posX + radius * Math.cos(0), posY + radius * Math.sin(0));
      for (let i = 1; i <= numberOfSides; i += 1) {
        this.canvasContext.lineTo(posX + radius * Math.cos(i * 2 * Math.PI / numberOfSides), posY + radius * Math.sin(i * 2 * Math.PI / numberOfSides));
      }
      this.canvasContext.closePath();
    }
  }

  drawPoly(posX = 0, posY = 0, radius = 0, numberOfSides = 3, rotation = 0, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.fillStyle = color;
      this.canvasContext.translate(posX, posY);
      this.canvasContext.rotate(rotation);
      this._drawPoly(0, 0, radius, numberOfSides);
      this.canvasContext.fill();
      this.restoreCamera();
    }
  }

  drawPolyOutline(posX = 0, posY = 0, radius = 0, numberOfSides = 3, rotation = 0, outlineWidth = 1, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.strokeStyle = color;
      this.canvasContext.lineWidth = outlineWidth;
      this.canvasContext.translate(posX, posY);
      this.canvasContext.rotate(rotation);
      this._drawPoly(0, 0, radius, numberOfSides);
      this.canvasContext.stroke();
      this.restoreCamera();
    }
  }

  _drawShape(points: Point[], origin: Point) {
    if (this.canvasContext) {
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(points[0].x + origin.x, points[0].y + origin.y);
      for (let i = 1; i < points.length; i++) {
        this.canvasContext.lineTo(points[i].x + origin.x, points[i].y + origin.y);
      }
      this.canvasContext.closePath();
    }
  }

  drawShape(points: Point[], origin = { x: 0, y: 0 }, rotation = 0, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.fillStyle = color;
      this.canvasContext.translate(origin.x, origin.y);
      this.canvasContext.rotate(rotation);
      this._drawShape(points, { x: -origin.x, y: -origin.y });
      this.canvasContext.fill();
      this.restoreCamera();
    }
  }

  drawShapeOutline(points: Point[], origin = { x: 0, y: 0 }, rotation = 0, width = 1, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.strokeStyle = color;
      this.canvasContext.lineWidth = width;
      this.canvasContext.translate(origin.x, origin.y);
      this.canvasContext.rotate(rotation);
      this._drawShape(points, { x: -origin.x, y: -origin.y });
      this.canvasContext.stroke();
      this.restoreCamera();
    }
  }

  measureText(text: string, fontSize = 12, fontFamily = "serif") {
    if (this.canvasContext) {
      this.canvasContext.font = `${fontSize} ${fontFamily}`;
      return this.canvasContext.measureText(text).width;
    }
    return 0;
  }

  drawText(text: string, posX = 0, posY = 0, fontSize = 12, fontFamily = "serif", align: 'left' | 'right' | 'center' | 'start' | 'end' = "start", direction: 'ltr' | 'rtl' = 'ltr', maxWidth?: number, rotation = 0, origin = { x: 0, y: 0 }, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.fillStyle = color;
      this.canvasContext.textAlign = align;
      this.canvasContext.direction = direction;
      this.canvasContext.font = `${fontSize} ${fontFamily}`;
      this.canvasContext.translate(origin.x, origin.y);
      this.canvasContext.rotate(rotation);
      this.canvasContext.fillText(text, posX - origin.x, posY - origin.y, maxWidth);
      this.restoreCamera();
    }
  }

  drawTextOutline(text: string, posX = 0, posY = 0, fontSize = 12, fontFamily = "serif", align: 'left' | 'right' | 'center' | 'start' | 'end' = "start", direction: 'ltr' | 'rtl' = 'ltr', maxWidth?: number, rotation = 0, origin = { x: 0, y: 0 }, outlineWidth = 1, color = DEFAULT_FILL_STROKE_COLOR) {
    if (this.canvasContext) {
      this.canvasContext.strokeStyle = color;
      this.canvasContext.lineWidth = outlineWidth;
      this.canvasContext.textAlign = align;
      this.canvasContext.direction = direction;
      this.canvasContext.font = `${fontSize} ${fontFamily}`;
      this.canvasContext.translate(origin.x, origin.y);
      this.canvasContext.rotate(rotation);
      this.canvasContext.strokeText(text, posX - origin.x, posY - origin.y, maxWidth);
      this.restoreCamera();
    }
  }

  private createTransform(originX:number, originY:number, scale:number, rotate:number) {
    if (this.canvasContext) {
      const xAxisX = Math.cos(rotate) * scale;
      const xAxisY = Math.sin(rotate) * scale;
      this.canvasContext.setTransform(xAxisX, xAxisY, -xAxisY, xAxisX, originX, originY);
    }
  }

  private restoreCamera() {
    this.createTransform(this.cameraOffestX, this.cameraOffestY, this.cameraZoom, this.cameraRotation);
  }

  cameraStart(posX = 0, posY = 0, zoom = 1, rotation = 0) {
    this.cameraOffestX = posX;
    this.cameraOffestY = posY;
    this.cameraZoom = zoom;
    this.cameraRotation = rotation;
    this.createTransform(posX, posY, zoom, rotation);
  }

  cameraEnd() {
    this.cameraOffestX = 0;
    this.cameraOffestY = 0;
    this.cameraZoom = 1;
    this.cameraRotation = 0;
    this.createTransform(0, 0, 1, 0);
  }


  static async loadImage(url: string) {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
  }

  drawImage(image: HTMLImageElement, sx = 0, sy = 0, sWidth = 0, sHeight = 0, dx = 0, dy = 0, dWidth = 0, dHeight = 0, rotation = 0) {
    if (this.canvasContext) {
      this.canvasContext.save();
      this.canvasContext.translate(dx + dWidth / 2, dy + dHeight / 2);
      this.canvasContext.rotate(rotation);
      this.canvasContext.drawImage(image, sx, sy, sWidth, sHeight, -dWidth / 2, -dHeight / 2, dWidth, dHeight);
      this.canvasContext.restore();
    }
  }
}

export { SimpleCanvas as default };
