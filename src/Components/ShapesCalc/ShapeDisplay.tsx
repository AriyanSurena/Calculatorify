import DynamicIcon from "../../SVGIcons/DynamicIcon";

type Shapes = 'Circle' | 'Rectangle' | 'Square' | 'Pentagon' | 'Hexagon' | 'Equilateral Triangle' | 'Isosceles Triangle' | 'Scalene Triangle' | 'Right Triangle'
interface stateType {
    shape: Shapes;
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

const ShapeDisplay: React.FC<stateType> = (state) => {
    return (
        <section
            className="flex justify-center w-full min-h-max text-center bg-slate-100 dark:bg-slate-600 rounded shadow p-2 my-2 ring-1 ring-slate-200 dark:ring-slate-700 relative"
        >
            {
                state.shape === "Circle" && (
                    <DynamicIcon icon="circle" />
                ) ||
                state.shape === "Rectangle" && (
                    <DynamicIcon icon="rectangle" />
                ) ||
                state.shape === "Square" && (
                    <DynamicIcon icon="square" />
                ) ||
                state.shape === "Pentagon" && (
                    <DynamicIcon icon="pentagon" />
                ) ||
                state.shape === "Hexagon" && (
                    <DynamicIcon icon="hexagon" />
                ) ||
                state.shape === "Equilateral Triangle" && (
                    <DynamicIcon icon="equilateralTriangle" />
                ) ||
                state.shape === "Isosceles Triangle" && (
                    <DynamicIcon icon="isoscelesTriangle" />
                ) ||
                state.shape === "Right Triangle" && (
                    <DynamicIcon icon="rightTriangle" />
                ) ||
                state.shape === "Scalene Triangle" && (
                    <DynamicIcon icon="scaleneTriangle" />
                )
            }

        </section>
    )
}

export default ShapeDisplay;