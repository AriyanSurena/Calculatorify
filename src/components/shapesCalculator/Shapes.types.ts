import En from "./languages/en.json"

export type ShapeTypes = 'Circle' | 'Rectangle' | 'Square' |
    'Pentagon' | 'Hexagon' | 'Equilateral Triangle' |
    'Isosceles Triangle' | 'Scalene Triangle' |
    'Right Triangle';

export type ShapesObj = typeof En.shapes.displayNames;

export interface StateType {
    shape: ShapeTypes;
    radius?: number,
    area: number,
    perimeter: number,
    width?: number,
    length?: number,
    height?: number,
    base?: number,
    side?: number,
    sideA?: number,
    sideB?: number,
    sideC?: number,
    equalSide?: number,
    hypotenuse?: number,
    error?: string
}

export interface ActionType {
    shape: ShapeTypes;
    radius?: number,
    width?: number,
    length?: number,
    height?: number,
    base?: number,
    side?: number,
    sideA?: number,
    sideB?: number,
    sideC?: number,
    equalSide?: number,
    hypotenuse?: number,
    error?: string
}