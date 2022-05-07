declare type Radius = number | {
    tl: number;
    tr: number;
    br: number;
    bl: number;
};
declare type Point = {
    x: number;
    y: number;
};
declare class SimpleCanvas {
    private renderWidth;
    private renderHeight;
    canvasContext: CanvasRenderingContext2D | null;
    private canvas;
    constructor(root: HTMLElement, renderWidth?: number, renderHeight?: number);
    resizeRenderResolution(newRenderWidth: number, newRenderHeight: number): void;
    clear(color: string): void;
    drawPixel(posX?: number, posY?: number, color?: string): void;
    drawLine(startPosX?: number, startPosY?: number, endPosX?: number, endPosY?: number, width?: number, color?: string): void;
    drawCircle(posX?: number, posY?: number, radius?: number, color?: string): void;
    drawCircleOutline(posX?: number, posY?: number, radius?: number, width?: number, color?: string): void;
    drawArc(posX?: number, posY?: number, radius?: number, startAngle?: number, endAngle?: number, color?: string): void;
    drawArcOutline(posX?: number, posY?: number, radius?: number, startAngle?: number, endAngle?: number, width?: number, color?: string): void;
    drawEllipse(posX?: number, posY?: number, radiusX?: number, radiusY?: number, rotation?: number, startAngle?: number, endAngle?: number, color?: string): void;
    drawEllipseOutline(posX?: number, posY?: number, radiusX?: number, radiusY?: number, rotation?: number, startAngle?: number, endAngle?: number, width?: number, color?: string): void;
    drawRectangle(posX?: number, posY?: number, width?: number, height?: number, rotation?: number, color?: string): void;
    drawRectangleOutline(posX?: number, posY?: number, width?: number, height?: number, rotation?: number, outlineWidth?: number, color?: string): void;
    private _drawRectangleRounded;
    drawRectangleRounded(posX: number | undefined, posY: number | undefined, width: number | undefined, height: number | undefined, radius: Radius, rotation?: number, color?: string): void;
    drawRectangleRoundedOutline(posX: number | undefined, posY: number | undefined, width: number | undefined, height: number | undefined, radius: Radius, rotation?: number, outlineWidth?: number, color?: string): void;
    private _drawPoly;
    drawPoly(posX?: number, posY?: number, radius?: number, numberOfSides?: number, rotation?: number, color?: string): void;
    drawPolyOutline(posX?: number, posY?: number, radius?: number, numberOfSides?: number, rotation?: number, outlineWidth?: number, color?: string): void;
    private _drawShape;
    drawShape(points: Point[], origin?: {
        x: number;
        y: number;
    }, rotation?: number, color?: string): void;
    drawShapeOutline(points: Point[], origin?: {
        x: number;
        y: number;
    }, rotation?: number, color?: string): void;
    measureText(text: string, fontSize?: number, fontFamily?: string): number;
    drawText(text: string, posX?: number, posY?: number, fontSize?: number, fontFamily?: string, align?: 'left' | 'right' | 'center' | 'start' | 'end', direction?: 'ltr' | 'rtl', maxWidth?: number, rotation?: number, origin?: {
        x: number;
        y: number;
    }, color?: string): void;
    camera(posX?: number, posY?: number, zoom?: number, rotation?: number): void;
}
export default SimpleCanvas;
