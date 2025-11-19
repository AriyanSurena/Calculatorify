import { useEffect, useReducer, useState, type ActionDispatch } from "react";
import ShapesJSON from "../../assets/Shapes.json";
import Toast from "../Toast";
import Menu from "../Menu";
import TextChip from "../TextChlip";
import ResultDisplay from "../ResultDisplay";
import ShapeInput from "./ShapeInput";
import ShapeDisplay from "./ShapeDisplay";

interface ShapesObj {
    shapes: string[];
}

type Shapes = 'Circle' | 'Rectangle' | 'Square' | 'Pentagon' | 'Hexagon' | 'Equilateral Triangle' | 'Isosceles Triangle' | 'Scalene Triangle' | 'Right Triangle';

const ShapesCalculator: React.FC = () => {
    const ShapesCategory: ShapesObj = ShapesJSON;
    const shapes: string[] = ShapesCategory.shapes;
    const [selectedShape, setSelectedShape] = useState<string>(shapes[0]);

    const initialState: stateType = {
        shape: "Circle",
        area: 0,
        perimeter: 0,
    }
    const [message, setMessage] = useState<string>('')

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

    interface actionType {
        shape: Shapes;
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

    function reducer(prevState: stateType, action: actionType): stateType {
        switch (action.shape) {
            case 'Circle': {
                const radius = action.radius ?? prevState.radius ?? 0;
                if (radius < 0) return prevState;
                return {
                    shape: "Circle",
                    radius,
                    area: (radius) && Math.PI * Math.pow(radius, 2),
                    perimeter: (radius) && (2 * Math.PI * radius)
                }
            }

            case 'Rectangle': {
                const width = action.width ?? prevState.width ?? 0;
                const length = action.length ?? prevState.length ?? 0;
                if (width < 0 || length < 0) return prevState;
                return {
                    shape: "Rectangle",
                    width,
                    length,
                    area: (width && length) && (width * length),
                    perimeter: (width && length) && (2 * (width + length))
                };
            }

            case 'Square': {
                const side = action.side ?? prevState.side ?? 0;
                return {
                    shape: "Square",
                    side,
                    area: (side) && (side * side),
                    perimeter: (side) && 4 * side
                };
            }

            case 'Pentagon': {
                const side = action.side ?? prevState.side ?? 0;
                if (side < 0) return prevState;

                // محاسبه ثابت پنج‌ضلعی (یک بار محاسبه شده)
                const pentagonAreaConstant = 1.720477400588967;

                return {
                    shape: "Pentagon",
                    side,
                    area: side > 0 ? pentagonAreaConstant * side * side : 0,
                    perimeter: side > 0 ? 5 * side : 0
                };
            }

            case 'Hexagon': {
                const side = action.side ?? prevState.side ?? 0;
                if (side < 0) return prevState;

                const hexagonAreaConstant = 2.598076211353316;

                return {
                    shape: "Hexagon",
                    side,
                    area: side > 0 ? hexagonAreaConstant * side * side : 0,
                    perimeter: side > 0 ? 6 * side : 0
                };
            }

            case 'Equilateral Triangle': {
                const side = action.side ?? prevState.side ?? 0;
                if (side < 0) return prevState;

                return {
                    shape: "Equilateral Triangle",
                    side,
                    area: side > 0 ? (Math.sqrt(3) / 4) * side * side : 0,
                    perimeter: side > 0 ? 3 * side : 0
                };
            }
case 'Isosceles Triangle': {
    const base = action.base ?? prevState.base ?? 0;
    const equalSide = action.equalSide ?? prevState.equalSide ?? 0;
    
    if (base < 0 || equalSide < 0) return prevState;
    
    // شرط جدید: چک کردن که مثلث تشکیل بشه یا نه
    if (base >= 2 * equalSide) {
        return {
            ...prevState,
            shape: "Isosceles Triangle",
            base,
            equalSide,
            area: 0,
            perimeter: 0,
            error: "قاعده نمی‌تواند بزرگتر یا مساوی دو برابر ضلع برابر باشد"
        };
    }
    
    const height = Math.sqrt(equalSide * equalSide - (base * base) / 4);
    
    return {
        shape: "Isosceles Triangle",
        base,
        equalSide,
        height,
        area: (base * height) / 2,
        perimeter: base + 2 * equalSide
    };
}

            case 'Scalene Triangle': {
                const sideA = action.sideA ?? prevState.sideA ?? 0;
                const sideB = action.sideB ?? prevState.sideB ?? 0;
                const sideC = action.sideC ?? prevState.sideC ?? 0;
                if (sideA < 0 || sideB < 0 || sideC < 0) return prevState;

                // فرمول هرون برای مساحت
                const s = (sideA + sideB + sideC) / 2;
                const area = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));

                return {
                    shape: "Scalene Triangle",
                    sideA,
                    sideB,
                    sideC,
                    area: sideA > 0 && sideB > 0 && sideC > 0 ? area : 0,
                    perimeter: sideA > 0 && sideB > 0 && sideC > 0 ? sideA + sideB + sideC : 0
                };
            }

            case 'Right Triangle': {
                const base = action.base ?? prevState.base ?? 0;
                const height = action.height ?? prevState.height ?? 0;
                if (base < 0 || height < 0) return prevState;

                const hypotenuse = Math.sqrt(base * base + height * height);

                return {
                    shape: "Right Triangle",
                    base,
                    height,
                    hypotenuse,
                    area: base > 0 && height > 0 ? (base * height) / 2 : 0,
                    perimeter: base > 0 && height > 0 ? base + height + hypotenuse : 0
                };
            }

            default: return prevState;
        }
    }

    const [state, dispatch] = useReducer(
        reducer,
        initialState
    )

    useEffect(() => {
        dispatch({
            shape: selectedShape as (Shapes),
            radius: undefined,
            width: undefined,
            length: undefined,
            side: undefined
        })
    }, [selectedShape])


    const Row: React.FC<{ label: string, placeholder: string, shape: (Shapes), param: string, onChange: ActionDispatch<[action: actionType]> }> = ({ label, placeholder, shape, param, onChange }) => {
        return (
            <div className="flex flex-col my-2 gap-2">
                <ShapeInput placeholder={placeholder} label={label} shape={shape} param={param} onChange={onChange} />
            </div>
        )
    }

    return (
        <>
            <article className="flex flex-col gap-4 w-11/12 max-w-lg px-2 py-4 bg-gray-100 dark:bg-gray-700 text-black dark:text-white shadow-2xl ring-1 ring-gray-300 dark:ring-gray-800 rounded relative">
                <Menu id='category' list={shapes} setSelected={setSelectedShape} selected={selectedShape} />
                {
                    <div className="flex flex-col">
                        <span className="flex flex-col my-2 gap-2">
                            {
                                (state.shape === 'Circle')
                                    ? (
                                        <Row label="Radius" shape="Circle" param="radius" placeholder="Enter Radius (r)" onChange={dispatch} />
                                    ) : null
                            }
                            {
                                (state.shape === 'Rectangle')
                                    ? (
                                        <>
                                            <Row label="Width" shape="Rectangle" param="width" placeholder="Enter Rectangle Width (w)" onChange={dispatch} />
                                            <Row label="Lenght" shape="Rectangle" param="length" placeholder="Enter Rectangle length (h)" onChange={dispatch} />
                                        </>
                                    ) : null
                            }
                            {
                                (state.shape === 'Square')
                                    ? (
                                        <Row label="Side" shape="Square" param="side" placeholder="Enter Square Side (s)" onChange={dispatch} />
                                    ) : null
                            }
                            {
                                (state.shape === 'Pentagon')
                                    ? (
                                        <Row label="Side" shape="Pentagon" param="side" placeholder="Enter Pentagon Side (s)" onChange={dispatch} />
                                    ) : null
                            }
                            {
                                (state.shape === 'Hexagon')
                                    ? (
                                        <Row label="Side" shape="Hexagon" param="side" placeholder="Enter Hexagon Side (s)" onChange={dispatch} />
                                    ) : null
                            }
                            {
                                (state.shape === 'Equilateral Triangle')
                                    ? (
                                        <Row label="Side" shape="Equilateral Triangle" param="side" placeholder="Enter Hexagon Side (s)" onChange={dispatch} />
                                    ) : null
                            }
                            {
                                (state.shape === 'Isosceles Triangle')
                                    ? (
                                        <>
                                            <Row label="Base" shape="Isosceles Triangle" param="base" placeholder="Enter Hexagon Side (s)" onChange={dispatch} />
                                            <Row label="Equal Side" shape="Isosceles Triangle" param="equalSide" placeholder="Enter Hexagon Side (s)" onChange={dispatch} />
                                        </>
                                    ) : null
                            }
                            {
                                (state.shape === 'Scalene Triangle')
                                    ? (
                                        <>
                                            <Row label="Side A" shape="Scalene Triangle" param="sideA" placeholder="Enter Hexagon Side (s)" onChange={dispatch} />
                                            <Row label="Side B" shape="Scalene Triangle" param="sideB" placeholder="Enter Hexagon Side (s)" onChange={dispatch} />
                                            <Row label="Side B" shape="Scalene Triangle" param="sideC" placeholder="Enter Hexagon Side (s)" onChange={dispatch} />
                                        </>
                                    ) : null
                            }
                            {
                                (state.shape === 'Right Triangle')
                                    ? (
                                        <>
                                            <Row label="Base" shape="Right Triangle" param="base" placeholder="Enter Hexagon Side (s)" onChange={dispatch} />
                                            <Row label="Height" shape="Right Triangle" param="height" placeholder="Enter Hexagon Side (s)" onChange={dispatch} />
                                        </>
                                    ) : null
                            }
                        </span>
                        <ResultDisplay label={"Area"} placeholder={state.shape + ' Area'} result={state.area} />
                        <ResultDisplay label={"Perimeter"} placeholder={state.shape + ' Perimeter'} result={state.perimeter} />
                        <ShapeDisplay {...state} />
                    </div>
                }

                {
                    state.area > 0 && state.perimeter > 0 && (
                        <TextChip setMessage={setMessage}>
                            <div className="overflow-x-hidden">
                                <span className="text-blue-500">{`${state.shape} Area is equal to `}</span>
                                <span className="text-blue-300">{` ${state.area} `}</span>
                                <div></div>
                                <span className="text-green-500">{`${state.shape} Perimeter is equal to `}</span>
                                <span className="text-green-300">{`${state.perimeter}`}</span>
                            </div>
                        </TextChip>
                    )
                }

            </article>
            {
                message &&
                <Toast message={message} type="success" duration={2000} />
            }
        </>
    )
}

export default ShapesCalculator;
