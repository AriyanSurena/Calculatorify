import { useEffect, useReducer, useState, type ActionDispatch } from "react";
import Fa from "./languages/fa.json";
import En from "./languages/en.json";
import useLanguage from "../../hooks/useLanguage";
import useContentConfig from "../../hooks/useContentConfig";
import Menu from "../common/Menu";
import TextChip from "../common/TextChlip";
import ResultDisplay from "../common/ResultDisplay";
import ShapeInput from "./ShapeInput";
import ShapeDisplay from "./ShapeInput";
import ToolCard from "../common/ToolCard";

type Shapes = 'Circle' | 'Rectangle' | 'Square' | 'Pentagon' | 'Hexagon' | 'Equilateral Triangle' | 'Isosceles Triangle' | 'Scalene Triangle' | 'Right Triangle';

type ShapesObj = typeof En.shapes.displayNames;

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

const ShapesCalculator: React.FC = () => {
    const { language } = useLanguage();
    const content = useContentConfig<typeof En>(En, Fa);

    const ShapesCategory: ShapesObj = language.includes('en-US') ? En.shapes.displayNames : Fa.shapes.displayNames;;
    const [shapesKeys, setShapesKeys] = useState<string[]>([]);
    const [selectedShape, setSelectedShape] = useState<string>(shapesKeys[0]);

    useEffect(() => {
        const keys = Object.keys(ShapesCategory)
        setShapesKeys(keys)
        setSelectedShape(keys[0])
    }, [language, ShapesCategory])

    console.log('SelectedShape', selectedShape)


    const initialState: stateType = {
        shape: "Circle",
        area: 0,
        perimeter: 0,
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
                        error: content?.shapes?.errors?.invalidTriangle
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
        <ToolCard id="Shapes_Calculator">
            <div className="p-2">
                {content?.shapes?.messages?.selectShape}
            </div>
            <Menu id='category' list={
                shapesKeys.map(key => ({
                    key: key,
                    label: ShapesCategory[key as Shapes]
                }))
            } setSelected={setSelectedShape} selected={selectedShape} />
            {
                <div className="flex flex-col">
                    <span className="flex flex-col my-2 gap-2">
                        {
                            (state.shape === 'Circle')
                                ? (
                                    <Row label={content?.shapes?.displayNames?.Circle} shape="Circle" param="radius" placeholder={content?.shapes?.placeholders?.radius} onChange={dispatch} />
                                ) : null
                        }
                        {
                            (state.shape === 'Rectangle')
                                ? (
                                    <>
                                        <Row label={content?.shapes?.labels?.width + ":"} shape="Rectangle" param="width" placeholder={content?.shapes?.placeholders?.width} onChange={dispatch} />
                                        <Row label={content?.shapes?.labels?.length + ":"} shape="Rectangle" param="length" placeholder={content?.shapes?.placeholders?.length} onChange={dispatch} />
                                    </>
                                ) : null
                        }
                        {
                            (state.shape === 'Square')
                                ? (
                                    <Row label={content?.shapes?.labels?.side} shape="Square" param="side" placeholder={content?.shapes?.placeholders?.side} onChange={dispatch} />
                                ) : null
                        }
                        {
                            (state.shape === 'Pentagon')
                                ? (
                                    <Row label={content?.shapes?.labels?.side} shape="Pentagon" param="side" placeholder={content?.shapes?.placeholders?.side} onChange={dispatch} />
                                ) : null
                        }
                        {
                            (state.shape === 'Hexagon')
                                ? (
                                    <Row label={content?.shapes?.placeholders?.side} shape="Hexagon" param="side" placeholder={content?.shapes?.placeholders?.side} onChange={dispatch} />
                                ) : null
                        }
                        {
                            (state.shape === 'Equilateral Triangle')
                                ? (
                                    <Row label={content?.shapes?.placeholders?.side} shape="Equilateral Triangle" param="side" placeholder={content?.shapes?.placeholders?.side} onChange={dispatch} />
                                ) : null
                        }
                        {
                            (state.shape === 'Isosceles Triangle')
                                ? (
                                    <>
                                        <Row label={content?.shapes?.labels?.base} shape="Isosceles Triangle" param="base" placeholder={content?.shapes?.placeholders?.base} onChange={dispatch} />
                                        <Row label={content?.shapes?.labels?.equalSide} shape="Isosceles Triangle" param="equalSide" placeholder={content?.shapes?.placeholders?.equalSide} onChange={dispatch} />
                                    </>
                                ) : null
                        }
                        {
                            (state.shape === 'Scalene Triangle')
                                ? (
                                    <>
                                        <Row label={content?.shapes?.labels?.sideA} shape="Scalene Triangle" param="sideA" placeholder={content?.shapes?.placeholders?.sideA} onChange={dispatch} />
                                        <Row label={content?.shapes?.labels?.sideB} shape="Scalene Triangle" param="sideB" placeholder={content?.shapes?.placeholders?.sideB} onChange={dispatch} />
                                        <Row label={content?.shapes?.labels?.sideC} shape="Scalene Triangle" param="sideC" placeholder={content?.shapes?.placeholders?.sideC} onChange={dispatch} />
                                    </>
                                ) : null
                        }
                        {
                            (state.shape === 'Right Triangle')
                                ? (
                                    <>
                                        <Row label={content?.shapes?.labels?.base} shape="Right Triangle" param="base" placeholder={content?.shapes?.placeholders?.base} onChange={dispatch} />
                                        <Row label={content?.shapes?.labels?.height} shape="Right Triangle" param="height" placeholder={content?.shapes?.placeholders?.height} onChange={dispatch} />
                                    </>
                                ) : null
                        }
                    </span>
                    <ResultDisplay label={content?.shapes?.units?.area} placeholder={content?.shapes?.units?.area} result={state.area} toastMessage={content?.shapes?.units?.area + ' ' + content?.toast?.copied} />
                    <ResultDisplay label={content?.shapes?.units?.perimeter} placeholder={content?.shapes?.units?.perimeter} result={state.perimeter} toastMessage={content?.shapes?.units?.perimeter + ' ' + content?.toast?.copied} />
                    <ShapeDisplay {...state} />
                </div>
            }

            {
                state.area > 0 && state.perimeter > 0 && (
                    <TextChip isCopyOn={true} toastMessage={content?.toast?.resCopied}>
                        <div className="overflow-x-hidden">
                            <span className="text-blue-500">{`${content?.shapes?.units?.area + ' ' + state.shape + ' ' + content?.shapes?.messages?.areaIs + ' '}`}</span>
                            <span className="text-blue-300">{` ${state.area} `}</span>
                            <div></div>
                            <span className="text-green-500">{`${content?.shapes?.units?.perimeter + ' ' + state.shape + ' ' + content?.shapes?.messages?.perimeterIs + ' '}`}</span>
                            <span className="text-green-300">{`${state.perimeter}`}</span>
                        </div>
                    </TextChip>
                )
            }

        </ToolCard>
    )
}

export default ShapesCalculator;
