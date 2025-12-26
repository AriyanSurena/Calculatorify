import En from "./languages/en.json"

export type ShapesType = 'Circle' | 'Rectangle' | 'Square' |
    'Pentagon' | 'Hexagon' | 'Equilateral Triangle';

export type ShapesObj = typeof En.shapes.displayNames;

export interface StateType {
    shape: ShapesType;
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
    shape: ShapesType;
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

export type ShapeInputProps = {
    shape: ShapesType;
    value?: number;
    param: string;
    label: string;
    placeholder?: string;
    onChange: (action: ActionType) => void;
};