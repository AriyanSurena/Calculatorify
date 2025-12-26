import DynamicIcon from "../svgIcons/DynamicIcon";
import type { StateType } from "./Shapes.types";

const ShapeDisplay: React.FC<StateType> = (state) => {
    return (
        <section
            className="flex justify-center w-1/2 min-h-max mx-auto text-center bg-slate-100 dark:bg-slate-600 rounded shadow p-2 my-2 ring-1 ring-slate-200 dark:ring-slate-700 relative"
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
                )
            }

        </section>
    )
}

export default ShapeDisplay;