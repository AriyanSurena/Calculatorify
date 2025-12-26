import { useEffect, useReducer, useState } from "react";
import Fa from "./languages/fa.json";
import En from "./languages/en.json";
import useLanguage from "../../hooks/useLanguage";
import useContentConfig from "../../hooks/useContentConfig";
import Menu from "../common/Menu";
import TextChip from "../common/TextChlip";
import ResultDisplay from "../common/ResultDisplay";
import ShapeInput from "./ShapeInput";
import ShapeDisplay from "./ShapeDisplay";
import ToolCard from "../common/ToolCard";
import type { ShapesObj, ShapesType, StateType, ActionType } from "./shapes.types";

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


    const initialState: StateType = {
        shape: "Circle",
        area: 0,
        perimeter: 0,
    }

    function reducer(prevState: StateType, action: ActionType): StateType {
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
            default: return prevState;
        }
    }
    const [state, dispatch] = useReducer(
        reducer,
        initialState
    )

    useEffect(() => {
        dispatch({
            shape: selectedShape as (ShapesType),
            radius: undefined,
            width: undefined,
            length: undefined,
            side: undefined
        })
    }, [selectedShape])

    return (
        <ToolCard id="Shapes_Calculator">
            <div className="p-2">
                {content?.shapes?.messages?.selectShape}
            </div>
            <Menu id='category' list={
                shapesKeys.map(key => ({
                    key: key,
                    label: ShapesCategory[key as ShapesType]
                }))
            } setSelected={setSelectedShape} selected={selectedShape} />
            <ShapeDisplay {...state} />
            {
                <div className="flex flex-col">
                    <span className="flex flex-col my-2 gap-2">
                        {
                            (state.shape === 'Circle')
                                ? (
                                    
                                    <ShapeInput placeholder={content?.shapes?.placeholders?.radius} label={content?.shapes?.labels?.radius + ":"} shape={"Circle"} param="radius" onChange={dispatch} />
                                    
                                ) : null
                        }
                        {
                            (state.shape === 'Rectangle')
                                ? (
                                    <>
                                        <ShapeInput label={content?.shapes?.labels?.width + ":"} shape="Rectangle" param="width" placeholder={content?.shapes?.placeholders?.width} onChange={dispatch} />
                                        <ShapeInput label={content?.shapes?.labels?.length + ":"} shape="Rectangle" param="length" placeholder={content?.shapes?.placeholders?.length} onChange={dispatch} />
                                    </>
                                ) : null
                        }
                        {
                            (state.shape === 'Square')
                                ? (
                                    <ShapeInput label={content?.shapes?.labels?.side + ":"} shape="Square" param="side" placeholder={content?.shapes?.placeholders?.side} onChange={dispatch} />
                                ) : null
                        }
                        {
                            (state.shape === 'Pentagon')
                                ? (
                                    <ShapeInput label={content?.shapes?.labels?.side + ":"} shape="Pentagon" param="side" placeholder={content?.shapes?.placeholders?.side} onChange={dispatch} />
                                ) : null
                        }
                        {
                            (state.shape === 'Hexagon')
                                ? (
                                    <ShapeInput label={content?.shapes?.placeholders?.side + ":"} shape="Hexagon" param="side" placeholder={content?.shapes?.placeholders?.side} onChange={dispatch} />
                                ) : null
                        }
                        {
                            (state.shape === 'Equilateral Triangle')
                                ? (
                                    <ShapeInput label={content?.shapes?.placeholders?.side + ":"} shape="Equilateral Triangle" param="side" placeholder={content?.shapes?.placeholders?.side} onChange={dispatch} />
                                ) : null
                        }
                    </span>
                    <ResultDisplay label={content?.shapes?.units?.area} placeholder={content?.shapes?.units?.area} result={state.area} toastMessage={content?.shapes?.units?.area + ' ' + content?.toast?.copied} />
                    <ResultDisplay label={content?.shapes?.units?.perimeter} placeholder={content?.shapes?.units?.perimeter} result={state.perimeter} toastMessage={content?.shapes?.units?.perimeter + ' ' + content?.toast?.copied} />
                </div>
            }

            {
                state.area > 0 && state.perimeter > 0 && (
                    <TextChip isCopyOn={true} toastMessage={content?.toast?.resCopied}>
                        <div className="overflow-x-hidden">
                            <span className="text-blue-500">{`${content?.shapes?.messages?.areaIs.replace('{shape}', content.shapes.displayNames[state.shape]) + ' '}`}</span>
                            <div className="text-blue-300">{` ${state.area.toFixed(2)} `}</div>
                            <div></div>
                            <span className="text-green-500">{`${content?.shapes?.messages?.perimeterIs.replace('{shape}', content.shapes.displayNames[state.shape]) + ' '}`}</span>
                            <div className="text-green-300">{`${state.perimeter.toFixed(2)}`}</div>
                        </div>
                    </TextChip>
                )
            }

        </ToolCard>
    )
}

export default ShapesCalculator;